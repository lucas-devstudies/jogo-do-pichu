package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.MeDTO;
import com.jogo_do_pichu.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Usuário", description = "Endpoints para gerenciamento e consulta de dados do perfil")
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Recupera dados do usuário logado",
            description = "Retorna informações básicas como nome, saldo, e-mail e tema baseando-se no Token JWT enviado no cabeçalho."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados retornados com sucesso"),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado ou Token inválido")
    })
    @GetMapping("/me")
    public ResponseEntity<MeDTO> getUser(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(userService.me(user));
    }
}
