package com.example.cakeshop.dto;

import com.example.cakeshop.entity.Order;
import com.example.cakeshop.enums.OrderStatus;
import com.example.cakeshop.enums.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class OrderResponseDto {

    private Long id;
    private Long userId;
    private List<OrderItemResponseDto> items;
    private Double totalAmount;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;
    private PaymentResponseDto payment;

    public static OrderResponseDto from(Order order) {
        OrderResponseDto dto = new OrderResponseDto();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setItems(order.getItems().stream()
                .map(OrderItemResponseDto::from)
                .collect(Collectors.toList()));
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setCreatedAt(order.getCreatedAt());
        if (order.getPayment() != null) {
            dto.setPayment(PaymentResponseDto.from(order.getPayment()));
        }
        return dto;
    }
}
