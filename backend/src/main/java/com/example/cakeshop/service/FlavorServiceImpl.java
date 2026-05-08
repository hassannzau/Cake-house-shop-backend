package com.example.cakeshop.service;

import com.example.cakeshop.dto.FlavorRequestDto;
import com.example.cakeshop.dto.FlavorResponseDto;
import com.example.cakeshop.entity.Flavors;
import com.example.cakeshop.repository.FlavorsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlavorServiceImpl implements FlavorService {

    private final FlavorsRepository flavorsRepository;

    public FlavorServiceImpl(FlavorsRepository flavorsRepository) {
        this.flavorsRepository = flavorsRepository;
    }

    @Override
    public List<FlavorResponseDto> getAll() {
        return flavorsRepository.findAll().stream()
                .map(FlavorResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public FlavorResponseDto getById(Long id) {
        Flavors flavor = flavorsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flavor not found with id: " + id));
        return FlavorResponseDto.from(flavor);
    }

    @Override
    public FlavorResponseDto create(FlavorRequestDto dto) {
        Flavors flavor = new Flavors();
        flavor.setName(dto.getName());
        return FlavorResponseDto.from(flavorsRepository.save(flavor));
    }

    @Override
    public FlavorResponseDto update(Long id, FlavorRequestDto dto) {
        Flavors flavor = flavorsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flavor not found with id: " + id));
        flavor.setName(dto.getName());
        return FlavorResponseDto.from(flavorsRepository.save(flavor));
    }

    @Override
    public void delete(Long id) {
        if (!flavorsRepository.existsById(id)) {
            throw new RuntimeException("Flavor not found with id: " + id);
        }
        flavorsRepository.deleteById(id);
    }
}
