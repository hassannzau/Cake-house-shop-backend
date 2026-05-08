package com.example.cakeshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Cake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String size; // 10+, 16+, etc
    private Double price;
    private String description;
    private int quantity;

    @Lob
    private Blob image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(
        name = "cake_allergens",
        joinColumns = @JoinColumn(name = "cake_id"),
        inverseJoinColumns = @JoinColumn(name = "allergen_id")
    )
    private List<Allergens> allergens = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "cake_flavors",
        joinColumns = @JoinColumn(name = "cake_id"),
        inverseJoinColumns = @JoinColumn(name = "flavor_id")
    )
    private List<Flavors> flavors = new ArrayList<>();
}
