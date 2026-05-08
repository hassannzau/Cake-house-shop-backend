package com.example.cakeshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; //birthday, wedding, etc

    @OneToMany(mappedBy = "category")
    private List<Cake> cakes;
}
