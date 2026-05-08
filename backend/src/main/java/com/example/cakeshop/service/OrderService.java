package com.example.cakeshop.service;

import com.example.cakeshop.dto.OrderRequestDto;
import com.example.cakeshop.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto placeOrder(OrderRequestDto dto, String userEmail);
    OrderResponseDto getById(Long id);
    List<OrderResponseDto> getByUser(String userEmail);
    OrderResponseDto cancelOrder(Long id);
}
