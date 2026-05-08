package com.example.cakeshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CakeRequestDto {

    @NotBlank(message = "Cake name is required")
    private String name;

    private String size;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    private String description;

    @Min(value = 0, message = "Quantity cannot be negative")
    private int quantity;

    private Long categoryId;
    private List<Long> flavorIds;
    private List<Long> allergenIds;
}
