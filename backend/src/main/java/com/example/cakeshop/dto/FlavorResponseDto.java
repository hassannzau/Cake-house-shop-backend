package com.example.cakeshop.dto;

import com.example.cakeshop.entity.Flavors;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlavorResponseDto {

    private Long id;
    private String name;

    public static FlavorResponseDto from(Flavors flavor) {
        FlavorResponseDto dto = new FlavorResponseDto();
        dto.setId(flavor.getId());
        dto.setName(flavor.getName());
        return dto;
    }
}
