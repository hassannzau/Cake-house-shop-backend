package com.example.cakeshop.dto;

import com.example.cakeshop.entity.Allergens;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllergenResponseDto {

    private Long id;
    private String name;

    public static AllergenResponseDto from(Allergens allergen) {
        AllergenResponseDto dto = new AllergenResponseDto();
        dto.setId(allergen.getId());
        dto.setName(allergen.getName());
        return dto;
    }
}
