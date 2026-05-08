package com.example.cakeshop.service;

import com.example.cakeshop.dto.CakeRequestDto;
import com.example.cakeshop.dto.CakeResponseDto;
import com.example.cakeshop.entity.Allergens;
import com.example.cakeshop.entity.Cake;
import com.example.cakeshop.entity.Category;
import com.example.cakeshop.entity.Flavors;
import com.example.cakeshop.repository.AllergensRepository;
import com.example.cakeshop.repository.CakeRepository;
import com.example.cakeshop.repository.CategoryRepository;
import com.example.cakeshop.repository.FlavorsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CakeServiceImpl implements CakeService {

    private final CakeRepository cakeRepository;
    private final CategoryRepository categoryRepository;
    private final FlavorsRepository flavorsRepository;
    private final AllergensRepository allergensRepository;

    public CakeServiceImpl(CakeRepository cakeRepository,
                           CategoryRepository categoryRepository,
                           FlavorsRepository flavorsRepository,
                           AllergensRepository allergensRepository) {
        this.cakeRepository = cakeRepository;
        this.categoryRepository = categoryRepository;
        this.flavorsRepository = flavorsRepository;
        this.allergensRepository = allergensRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> getAll() {
        return cakeRepository.findAll().stream()
                .map(CakeResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CakeResponseDto getById(Long id) {
        Cake cake = cakeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cake not found with id: " + id));
        return CakeResponseDto.from(cake);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> getNewArrivals() {
        return cakeRepository.findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "id")))
                .getContent().stream().map(CakeResponseDto::from).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> getTopRated() {
        return cakeRepository.findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "price")))
                .getContent().stream().map(CakeResponseDto::from).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> getBestSellers() {
        return cakeRepository.findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.ASC, "id")))
                .getContent().stream().map(CakeResponseDto::from).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> search(String q) {
        return cakeRepository.findByNameContainingIgnoreCase(q)
                .stream().map(CakeResponseDto::from).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CakeResponseDto> filter(String category, List<String> flavors, List<String> sizes) {
        return cakeRepository.findAll().stream()
                .filter(cake -> {
                    if (category != null && !category.isEmpty()) {
                        return cake.getCategory() != null &&
                               cake.getCategory().getName().equalsIgnoreCase(category);
                    }
                    return true;
                })
                .filter(cake -> {
                    if (sizes != null && !sizes.isEmpty()) {
                        return sizes.contains(cake.getSize());
                    }
                    return true;
                })
                .filter(cake -> {
                    if (flavors != null && !flavors.isEmpty()) {
                        return cake.getFlavors().stream()
                                .anyMatch(f -> flavors.contains(f.getName()));
                    }
                    return true;
                })
                .map(CakeResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public CakeResponseDto create(CakeRequestDto dto) {
        Cake cake = new Cake();
        applyDto(cake, dto);
        return CakeResponseDto.from(cakeRepository.save(cake));
    }

    @Override
    public CakeResponseDto update(Long id, CakeRequestDto dto) {
        Cake cake = cakeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cake not found with id: " + id));
        applyDto(cake, dto);
        return CakeResponseDto.from(cakeRepository.save(cake));
    }

    @Override
    public void delete(Long id) {
        if (!cakeRepository.existsById(id)) {
            throw new RuntimeException("Cake not found with id: " + id);
        }
        cakeRepository.deleteById(id);
    }

    private void applyDto(Cake cake, CakeRequestDto dto) {
        cake.setName(dto.getName());
        cake.setSize(dto.getSize());
        cake.setPrice(dto.getPrice());
        cake.setDescription(dto.getDescription());
        cake.setQuantity(dto.getQuantity());

        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));
            cake.setCategory(category);
        }

        if (dto.getFlavorIds() != null) {
            List<Flavors> flavors = dto.getFlavorIds().stream()
                    .map(fid -> flavorsRepository.findById(fid)
                            .orElseThrow(() -> new RuntimeException("Flavor not found with id: " + fid)))
                    .collect(Collectors.toList());
            cake.setFlavors(flavors);
        }

        if (dto.getAllergenIds() != null) {
            List<Allergens> allergens = dto.getAllergenIds().stream()
                    .map(aid -> allergensRepository.findById(aid)
                            .orElseThrow(() -> new RuntimeException("Allergen not found with id: " + aid)))
                    .collect(Collectors.toList());
            cake.setAllergens(allergens);
        }
    }
}
