package com.example.cakeshop.controller;

import com.example.cakeshop.dto.CakeRequestDto;
import com.example.cakeshop.dto.CakeResponseDto;
import com.example.cakeshop.service.CakeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cakes")
public class CakeController {

    private final CakeService cakeService;

    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping
    public ResponseEntity<List<CakeResponseDto>> getAll() {
        return ResponseEntity.ok(cakeService.getAll());
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<List<CakeResponseDto>> getNewArrivals() {
        return ResponseEntity.ok(cakeService.getNewArrivals());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<CakeResponseDto>> getTopRated() {
        return ResponseEntity.ok(cakeService.getTopRated());
    }

    @GetMapping("/best-seller")
    public ResponseEntity<List<CakeResponseDto>> getBestSellers() {
        return ResponseEntity.ok(cakeService.getBestSellers());
    }

    @GetMapping("/search")
    public ResponseEntity<List<CakeResponseDto>> search(@RequestParam String q) {
        return ResponseEntity.ok(cakeService.search(q));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CakeResponseDto>> filter(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> flavors,
            @RequestParam(required = false) List<String> sizes) {
        return ResponseEntity.ok(cakeService.filter(category, flavors, sizes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CakeResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(cakeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CakeResponseDto> create(@Valid @RequestBody CakeRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cakeService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CakeResponseDto> update(@PathVariable Long id,
                                                  @Valid @RequestBody CakeRequestDto dto) {
        return ResponseEntity.ok(cakeService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cakeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
