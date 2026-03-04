package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.LoginRequestDTO;
import com.jogo_do_pichu.backend.dto.RegisterRequestDTO;
import com.jogo_do_pichu.backend.dto.ResponseDTO;
import com.jogo_do_pichu.backend.infra.security.TokenService;
import com.jogo_do_pichu.backend.repositories.Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final Repository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        //Verificação se senhas forem iguais
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {

        Optional<User> userTest = this.repository.findByEmail(body.email());

        if (userTest.isEmpty()) {
            User user = new User();
            user.setName(body.name());
            user.setEmail(body.email());
            user.setPassword(passwordEncoder.encode(body.password()));
            this.repository.save(user);

            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
