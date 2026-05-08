package com.example.cakeshop.service;

import com.example.cakeshop.dto.OrderItemRequestDto;
import com.example.cakeshop.dto.OrderRequestDto;
import com.example.cakeshop.dto.OrderResponseDto;
import com.example.cakeshop.entity.*;
import com.example.cakeshop.enums.OrderStatus;
import com.example.cakeshop.enums.PaymentMethod;
import com.example.cakeshop.repository.CakeRepository;
import com.example.cakeshop.repository.OrderRepository;
import com.example.cakeshop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CakeRepository cakeRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CakeRepository cakeRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cakeRepository = cakeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public OrderResponseDto placeOrder(OrderRequestDto dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        Order order = new Order();
        order.setUser(user);
        order.setPaymentMethod(dto.getPaymentMethod());

        List<OrderItem> items = new ArrayList<>();
        double total = 0.0;

        for (OrderItemRequestDto itemDto : dto.getItems()) {
            Cake cake = cakeRepository.findById(itemDto.getCakeId())
                    .orElseThrow(() -> new RuntimeException("Cake not found with id: " + itemDto.getCakeId()));

            if (cake.getQuantity() < itemDto.getQuantity()) {
                throw new RuntimeException("Insufficient stock for cake: " + cake.getName());
            }

            double subtotal = cake.getPrice() * itemDto.getQuantity();
            total += subtotal;

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setCake(cake);
            item.setQuantity(itemDto.getQuantity());
            item.setUnitPrice(cake.getPrice());
            item.setSubtotal(subtotal);
            items.add(item);

            // Reduce stock
            cake.setQuantity(cake.getQuantity() - itemDto.getQuantity());
            cakeRepository.save(cake);
        }

        order.setItems(items);
        order.setTotalAmount(total);
        order.setStatus(OrderStatus.PENDING);

        // Cash orders are confirmed immediately; card orders wait for payment
        if (dto.getPaymentMethod() == PaymentMethod.CASH) {
            order.setStatus(OrderStatus.CONFIRMED);
        }

        return OrderResponseDto.from(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDto getById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return OrderResponseDto.from(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));
        return orderRepository.findByUser(user).stream()
                .map(OrderResponseDto::from)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDto cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel a delivered order");
        }
        // Restore stock
        for (OrderItem item : order.getItems()) {
            Cake cake = item.getCake();
            cake.setQuantity(cake.getQuantity() + item.getQuantity());
            cakeRepository.save(cake);
        }
        order.setStatus(OrderStatus.CANCELLED);
        return OrderResponseDto.from(orderRepository.save(order));
    }
}
