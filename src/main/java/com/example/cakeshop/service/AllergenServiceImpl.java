package com.example.cakeshop.service;

import com.example.cakeshop.dto.AllergenRequestDto;
import com.example.cakeshop.dto.AllergenResponseDto;
import com.example.cakeshop.entity.Allergens;
import com.example.cakeshop.repository.AllergensRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AllergenServiceImpl implements AllergenService {

    private final AllergensRepository allergensRepository;

    public AllergenServiceImpl(AllergensRepository allergensRepository) {
        this.allergensRepository = allergensRepository;
    }

    @Override
    public List<AllergenResponseDto> getAll() {
        return allergensRepository.findAll().stream()
                .map(AllergenResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public AllergenResponseDto getById(Long id) {
        Allergens allergen = allergensRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allergen not found with id: " + id));
        return AllergenResponseDto.from(allergen);
    }

    @Override
    public AllergenResponseDto create(AllergenRequestDto dto) {
        Allergens allergen = new Allergens();
        allergen.setName(dto.getName());
        return AllergenResponseDto.from(allergensRepository.save(allergen));
    }

    @Override
    public AllergenResponseDto update(Long id, AllergenRequestDto dto) {
        Allergens allergen = allergensRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allergen not found with id: " + id));
        allergen.setName(dto.getName());
        return AllergenResponseDto.from(allergensRepository.save(allergen));
    }

    @Override
    public void delete(Long id) {
        if (!allergensRepository.existsById(id)) {
            throw new RuntimeException("Allergen not found with id: " + id);
        }
        allergensRepository.deleteById(id);
    }
}
