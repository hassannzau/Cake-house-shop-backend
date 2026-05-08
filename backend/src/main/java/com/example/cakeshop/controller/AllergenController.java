package com.example.cakeshop.controller;

import com.example.cakeshop.dto.AllergenRequestDto;
import com.example.cakeshop.dto.AllergenResponseDto;
import com.example.cakeshop.service.AllergenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allergens")
public class AllergenController {

    private final AllergenService allergenService;

    public AllergenController(AllergenService allergenService) {
        this.allergenService = allergenService;
    }

    @GetMapping
    public ResponseEntity<List<AllergenResponseDto>> getAll() {
        return ResponseEntity.ok(allergenService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllergenResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(allergenService.getById(id));
    }

    @PostMapping
    public ResponseEntity<AllergenResponseDto> create(@Valid @RequestBody AllergenRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(allergenService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AllergenResponseDto> update(@PathVariable Long id,
                                                      @Valid @RequestBody AllergenRequestDto dto) {
        return ResponseEntity.ok(allergenService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        allergenService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
