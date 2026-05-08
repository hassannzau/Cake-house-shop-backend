package com.example.cakeshop.repository;

import com.example.cakeshop.entity.Cake;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CakeRepository extends JpaRepository<Cake, Long> {
    List<Cake> findByNameContainingIgnoreCase(String name);
}
