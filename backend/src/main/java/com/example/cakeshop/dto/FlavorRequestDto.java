package com.example.cakeshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlavorRequestDto {

    @NotBlank(message = "Flavor name is required")
    private String name;
}
