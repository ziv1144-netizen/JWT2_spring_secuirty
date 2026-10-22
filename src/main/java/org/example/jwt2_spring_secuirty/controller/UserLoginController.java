package org.example.jwt2_spring_secuirty.controller;

import org.example.jwt2_spring_secuirty.dto.LoginRequest;
import org.example.jwt2_spring_secuirty.dto.LoginResponse;
import org.example.jwt2_spring_secuirty.dto.RegisterRequest;
import org.example.jwt2_spring_secuirty.dto.UserResponse;
import org.example.jwt2_spring_secuirty.service.UserLoginService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * Public endpoints (permitAll in SecurityConfig): login and register.
 * The controller only receives HTTP and delegates - the logic lives in UserLoginService.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserLoginController {

    private final UserLoginService userLoginService;

    // POST /api/auth/login   {"username":"admin","password":"Admin123!"}
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userLoginService.login(request);
    }

    // POST /api/auth/register   {"username":"dana","password":"Dana1234!"}
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        return userLoginService.register(request);
    }
}