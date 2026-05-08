package com.example.cakeshop.entity;

import com.example.cakeshop.enums.PaymentMethod;
import com.example.cakeshop.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.PENDING;

    // Populated for CARD payments; null for CASH
    private String stripePaymentIntentId;
    private String stripeClientSecret;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
