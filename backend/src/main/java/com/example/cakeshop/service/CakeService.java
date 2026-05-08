package com.example.cakeshop.service;

import com.example.cakeshop.dto.CakeRequestDto;
import com.example.cakeshop.dto.CakeResponseDto;

import java.util.List;

public interface CakeService {
    List<CakeResponseDto> getAll();
    CakeResponseDto getById(Long id);
    CakeResponseDto create(CakeRequestDto dto);
    CakeResponseDto update(Long id, CakeRequestDto dto);
    void delete(Long id);
    List<CakeResponseDto> getNewArrivals();
    List<CakeResponseDto> getTopRated();
    List<CakeResponseDto> getBestSellers();
    List<CakeResponseDto> search(String q);
    List<CakeResponseDto> filter(String category, List<String> flavors, List<String> sizes);
}
