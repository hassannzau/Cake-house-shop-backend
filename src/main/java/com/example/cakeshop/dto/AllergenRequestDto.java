package com.example.cakeshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergenRequestDto {

    @NotBlank(message = "Allergen name is required")
    private String name;
}
