package org.example.jwt2_spring_secuirty.dto;

import java.util.List;

public record LoginResponse(
        String token,
        String tokenType,     // "Bearer"
        long expiresInMs,
        String username,
        List<String> roles) {
}