package com.example.cakeshop.dto;

import com.example.cakeshop.entity.Cake;
import lombok.Getter;
import lombok.Setter;

import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class CakeResponseDto {

    private Long id;
    private String name;
    private String size;
    private Double price;
    private String description;
    private int quantity;
    private String imageBase64;
    private CategoryResponseDto category;
    private List<FlavorResponseDto> flavors;
    private List<AllergenResponseDto> allergens;

    public static CakeResponseDto from(Cake cake) {
        CakeResponseDto dto = new CakeResponseDto();
        dto.setId(cake.getId());
        dto.setName(cake.getName());
        dto.setSize(cake.getSize());
        dto.setPrice(cake.getPrice());
        dto.setDescription(cake.getDescription());
        dto.setQuantity(cake.getQuantity());
        if (cake.getImage() != null) {
            try {
                byte[] bytes = cake.getImage().getBytes(1, (int) cake.getImage().length());
                dto.setImageBase64(Base64.getEncoder().encodeToString(bytes));
            } catch (SQLException ignored) {
            }
        }
        if (cake.getCategory() != null) {
            dto.setCategory(CategoryResponseDto.from(cake.getCategory()));
        }
        dto.setFlavors(cake.getFlavors().stream()
                .map(FlavorResponseDto::from)
                .collect(Collectors.toList()));
        dto.setAllergens(cake.getAllergens().stream()
                .map(AllergenResponseDto::from)
                .collect(Collectors.toList()));
        return dto;
    }
}
