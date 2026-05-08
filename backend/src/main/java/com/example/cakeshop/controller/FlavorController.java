package com.example.cakeshop.controller;

import com.example.cakeshop.dto.FlavorRequestDto;
import com.example.cakeshop.dto.FlavorResponseDto;
import com.example.cakeshop.service.FlavorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flavors")
public class FlavorController {

    private final FlavorService flavorService;

    public FlavorController(FlavorService flavorService) {
        this.flavorService = flavorService;
    }

    @GetMapping
    public ResponseEntity<List<FlavorResponseDto>> getAll() {
        return ResponseEntity.ok(flavorService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlavorResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(flavorService.getById(id));
    }

    @PostMapping
    public ResponseEntity<FlavorResponseDto> create(@Valid @RequestBody FlavorRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(flavorService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlavorResponseDto> update(@PathVariable Long id,
                                                    @Valid @RequestBody FlavorRequestDto dto) {
        return ResponseEntity.ok(flavorService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        flavorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
