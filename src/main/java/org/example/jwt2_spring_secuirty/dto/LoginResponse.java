package org.example.jwt2_spring_secuirty.dto;

import java.util.List;

public record LoginResponse(
        String token,
        String reftoken,
        String tokenType,     // "Bearer"
        long expiresInMs,
        long refExpiresInMs,
        String username,
        List<String> roles) {
}