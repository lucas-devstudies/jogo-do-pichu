package com.jogo_do_pichu.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta padrão contendo os dados básicos do usuário e o token de acesso")
public record ResponseDTO (
        @Schema(description = "Nome do usuário autenticado", example = "Pichu Trainer")
        String name,

        @Schema(description = "Token JWT para autenticação nas rotas protegidas",
                example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String token
){}
