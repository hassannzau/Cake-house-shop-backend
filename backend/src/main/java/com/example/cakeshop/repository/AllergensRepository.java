package com.example.cakeshop.repository;

import com.example.cakeshop.entity.Allergens;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllergensRepository extends JpaRepository<Allergens,Long> {
}
