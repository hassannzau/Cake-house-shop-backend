package com.example.cakeshop.dto;

import com.example.cakeshop.entity.Payment;
import com.example.cakeshop.enums.PaymentMethod;
import com.example.cakeshop.enums.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentResponseDto {

    private Long id;
    private Long orderId;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private String stripeClientSecret; // non-null for CARD payments; send to frontend to complete payment
    private Double amount;
    private LocalDateTime createdAt;

    public static PaymentResponseDto from(Payment payment) {
        PaymentResponseDto dto = new PaymentResponseDto();
        dto.setId(payment.getId());
        dto.setOrderId(payment.getOrder().getId());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setStatus(payment.getStatus());
        dto.setStripeClientSecret(payment.getStripeClientSecret());
        dto.setAmount(payment.getAmount());
        dto.setCreatedAt(payment.getCreatedAt());
        return dto;
    }
}
