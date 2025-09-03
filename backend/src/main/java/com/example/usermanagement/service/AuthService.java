package com.example.usermanagement.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    // Demo: Username=admin, Password=123456
    public String authenticate(String username, String password) {
        if ("admin".equals(username) && "123456".equals(password)) {
            return "mock-jwt-token-123456"; // Thực tế sẽ dùng JWT library
        }
        throw new RuntimeException("Invalid username or password");
    }
}
