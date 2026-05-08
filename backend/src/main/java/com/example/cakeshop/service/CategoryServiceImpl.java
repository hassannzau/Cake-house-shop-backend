package com.example.cakeshop.service;

import com.example.cakeshop.dto.CategoryRequestDto;
import com.example.cakeshop.dto.CategoryResponseDto;
import com.example.cakeshop.entity.Category;
import com.example.cakeshop.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponseDto> getAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDto getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return CategoryResponseDto.from(category);
    }

    @Override
    public CategoryResponseDto create(CategoryRequestDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        return CategoryResponseDto.from(categoryRepository.save(category));
    }

    @Override
    public CategoryResponseDto update(Long id, CategoryRequestDto dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        category.setName(dto.getName());
        return CategoryResponseDto.from(categoryRepository.save(category));
    }

    @Override
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
