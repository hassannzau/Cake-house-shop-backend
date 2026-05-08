package com.example.cakeshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequestDto {

    @NotNull(message = "Cake ID is required")
    private Long cakeId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
