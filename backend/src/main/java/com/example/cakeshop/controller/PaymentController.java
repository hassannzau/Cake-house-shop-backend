package com.example.cakeshop.controller;

import com.example.cakeshop.dto.PaymentResponseDto;
import com.example.cakeshop.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Step 1 for card payments: creates a Stripe PaymentIntent.
     * Returns clientSecret — pass it to Stripe.js on the frontend to show the card form.
     */
    @PostMapping("/card/initiate/{orderId}")
    public ResponseEntity<PaymentResponseDto> initiateCardPayment(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.initiateCardPayment(orderId));
    }

    /**
     * Step 2 for card payments: called after Stripe.js confirms the payment.
     * Verifies the PaymentIntent with Stripe and marks the order as CONFIRMED.
     */
    @PostMapping("/card/confirm/{orderId}")
    public ResponseEntity<PaymentResponseDto> confirmCardPayment(@PathVariable Long orderId,
                                                                 @RequestParam String paymentIntentId) {
        return ResponseEntity.ok(paymentService.confirmCardPayment(orderId, paymentIntentId));
    }

    /**
     * For cash payments: marks the payment as COMPLETED and the order as CONFIRMED.
     */
    @PostMapping("/cash/{orderId}")
    public ResponseEntity<PaymentResponseDto> processCashPayment(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.processCashPayment(orderId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentResponseDto> getByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getByOrderId(orderId));
    }
}
