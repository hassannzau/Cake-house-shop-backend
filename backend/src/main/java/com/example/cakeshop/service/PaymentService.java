package com.example.cakeshop.service;

import com.example.cakeshop.dto.PaymentResponseDto;

public interface PaymentService {
    /**
     * Creates a Stripe PaymentIntent for the given order and returns the clientSecret.
     * The frontend uses the clientSecret with Stripe.js to complete the card payment.
     */
    PaymentResponseDto initiateCardPayment(Long orderId);

    /**
     * Called after the frontend confirms the Stripe payment.
     * Verifies the PaymentIntent status with Stripe and marks the order as CONFIRMED.
     */
    PaymentResponseDto confirmCardPayment(Long orderId, String paymentIntentId);

    /**
     * Processes a cash payment — marks payment as COMPLETED and order as CONFIRMED.
     */
    PaymentResponseDto processCashPayment(Long orderId);

    PaymentResponseDto getByOrderId(Long orderId);
}
