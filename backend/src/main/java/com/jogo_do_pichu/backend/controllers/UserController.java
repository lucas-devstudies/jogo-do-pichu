package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.MeDTO;
import com.jogo_do_pichu.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<MeDTO> getUser(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(userService.me(user));
    }
}
