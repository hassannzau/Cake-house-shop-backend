package com.example.cakeshop.dto;

import com.example.cakeshop.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemResponseDto {

    private Long id;
    private Long cakeId;
    private String cakeName;
    private int quantity;
    private Double unitPrice;
    private Double subtotal;

    public static OrderItemResponseDto from(OrderItem item) {
        OrderItemResponseDto dto = new OrderItemResponseDto();
        dto.setId(item.getId());
        dto.setCakeId(item.getCake().getId());
        dto.setCakeName(item.getCake().getName());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setSubtotal(item.getSubtotal());
        return dto;
    }
}
