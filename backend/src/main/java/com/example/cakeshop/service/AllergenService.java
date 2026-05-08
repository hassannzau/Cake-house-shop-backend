package com.example.cakeshop.service;

import com.example.cakeshop.dto.AllergenRequestDto;
import com.example.cakeshop.dto.AllergenResponseDto;

import java.util.List;

public interface AllergenService {
    List<AllergenResponseDto> getAll();
    AllergenResponseDto getById(Long id);
    AllergenResponseDto create(AllergenRequestDto dto);
    AllergenResponseDto update(Long id, AllergenRequestDto dto);
    void delete(Long id);
}
