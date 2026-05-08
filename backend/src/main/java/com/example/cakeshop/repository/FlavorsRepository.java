package com.example.cakeshop.repository;

import com.example.cakeshop.entity.Flavors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlavorsRepository extends JpaRepository<Flavors,Long> {
}
