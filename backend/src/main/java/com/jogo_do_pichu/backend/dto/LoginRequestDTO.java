package com.jogo_do_pichu.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para autenticação do usuário")
public record LoginRequestDTO (

        @Schema(description = "E-mail cadastrado do usuário", example = "treinador@pichu.com")
        String email,

        @Schema(description = "Senha de acesso", example = "senha123", accessMode = Schema.AccessMode.WRITE_ONLY)
        String password
) {}
