package com.example.cakeshop.service;

import com.example.cakeshop.dto.PaymentResponseDto;
import com.example.cakeshop.entity.Order;
import com.example.cakeshop.entity.Payment;
import com.example.cakeshop.enums.OrderStatus;
import com.example.cakeshop.enums.PaymentMethod;
import com.example.cakeshop.enums.PaymentStatus;
import com.example.cakeshop.repository.OrderRepository;
import com.example.cakeshop.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public PaymentResponseDto initiateCardPayment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        if (order.getPaymentMethod() != PaymentMethod.CARD) {
            throw new RuntimeException("Order payment method is not CARD");
        }

        if (paymentRepository.findByOrderId(orderId).isPresent()) {
            throw new RuntimeException("Payment already initiated for order: " + orderId);
        }

        try {
            Stripe.apiKey = stripeSecretKey;

            long amountInPence = Math.round(order.getTotalAmount() * 100);

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInPence)
                    .setCurrency("gbp")
                    .addPaymentMethodType("card")
                    .putMetadata("orderId", orderId.toString())
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            Payment payment = new Payment();
            payment.setOrder(order);
            payment.setPaymentMethod(PaymentMethod.CARD);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setAmount(order.getTotalAmount());
            payment.setStripePaymentIntentId(intent.getId());
            payment.setStripeClientSecret(intent.getClientSecret());

            return PaymentResponseDto.from(paymentRepository.save(payment));

        } catch (StripeException e) {
            throw new RuntimeException("Stripe error: " + e.getMessage(), e);
        }
    }

    @Override
    public PaymentResponseDto confirmCardPayment(Long orderId, String paymentIntentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + orderId));

        try {
            Stripe.apiKey = stripeSecretKey;
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

            if ("succeeded".equals(intent.getStatus())) {
                payment.setStatus(PaymentStatus.COMPLETED);
                order.setStatus(OrderStatus.CONFIRMED);
                orderRepository.save(order);
            } else {
                payment.setStatus(PaymentStatus.FAILED);
                throw new RuntimeException("Payment not succeeded. Stripe status: " + intent.getStatus());
            }

            return PaymentResponseDto.from(paymentRepository.save(payment));

        } catch (StripeException e) {
            throw new RuntimeException("Stripe error: " + e.getMessage(), e);
        }
    }

    @Override
    public PaymentResponseDto processCashPayment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        if (order.getPaymentMethod() != PaymentMethod.CASH) {
            throw new RuntimeException("Order payment method is not CASH");
        }

        if (paymentRepository.findByOrderId(orderId).isPresent()) {
            throw new RuntimeException("Payment already processed for order: " + orderId);
        }

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(PaymentMethod.CASH);
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setAmount(order.getTotalAmount());

        order.setStatus(OrderStatus.CONFIRMED);
        orderRepository.save(order);

        return PaymentResponseDto.from(paymentRepository.save(payment));
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponseDto getByOrderId(Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order: " + orderId));
        return PaymentResponseDto.from(payment);
    }
}
