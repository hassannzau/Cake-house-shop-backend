package com.example.cakeshop.service;

import com.example.cakeshop.dto.CategoryRequestDto;
import com.example.cakeshop.dto.CategoryResponseDto;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getAll();
    CategoryResponseDto getById(Long id);
    CategoryResponseDto create(CategoryRequestDto dto);
    CategoryResponseDto update(Long id, CategoryRequestDto dto);
    void delete(Long id);
}
