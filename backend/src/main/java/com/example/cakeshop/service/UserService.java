package com.example.cakeshop.service;

import com.example.cakeshop.dto.LoginDto;
import com.example.cakeshop.dto.RegistrationDto;
import com.example.cakeshop.entity.User;

public interface UserService {
    User register(RegistrationDto dto);
    User login(LoginDto dto);
}
