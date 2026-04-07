package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.TypeTheme;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para a criação de uma nova conta no Jogo do Pichu")
public record RegisterRequestDTO (
        @Schema(description = "Nome completo do novo treinador", example = "Red Ketchum")
        String name,

        @Schema(description = "E-mail único para acesso", example = "red@pichu.com")
        String email,

        @Schema(
                description = "Senha de acesso (Mínimo de 6 caracteres)",
                example = "pika123",
                accessMode = Schema.AccessMode.WRITE_ONLY
        )
        String password,

        @Schema(description = "Preferência de tema inicial", example = "Light")
        TypeTheme theme
){}
