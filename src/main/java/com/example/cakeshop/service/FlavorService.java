package com.example.cakeshop.service;

import com.example.cakeshop.dto.FlavorRequestDto;
import com.example.cakeshop.dto.FlavorResponseDto;

import java.util.List;

public interface FlavorService {
    List<FlavorResponseDto> getAll();
    FlavorResponseDto getById(Long id);
    FlavorResponseDto create(FlavorRequestDto dto);
    FlavorResponseDto update(Long id, FlavorRequestDto dto);
    void delete(Long id);
}
