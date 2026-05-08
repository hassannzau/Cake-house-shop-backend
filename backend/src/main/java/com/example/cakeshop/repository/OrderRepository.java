package com.example.cakeshop.repository;

import com.example.cakeshop.entity.Order;
import com.example.cakeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByUserId(Long userId);
}
