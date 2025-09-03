package com.example.usermanagement.dto;

public class LoginResponse {
    private String token;
    private String message;

    public LoginResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    // Getters
    public String getToken() { return token; }
    public String getMessage() { return message; }
}
