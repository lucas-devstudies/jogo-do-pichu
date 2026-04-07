package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.TypeTheme;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

@Schema(description = "Dados de perfil resumidos do usuário logado (Quem sou eu)")
public record MeDTO(

        @Schema(description = "Nome de exibição do usuário", example = "Pichu Master")
        String name,

        @Schema(description = "Saldo atual da conta disponível para jogo", example = "1000.00", accessMode = Schema.AccessMode.READ_ONLY)
        BigDecimal balance,

        @Schema(description = "E-mail de identificação do usuário", example = "contato@pichu.com")
        String email,

        @Schema(description = "Preferência de tema atual", example = "Dark")
        TypeTheme theme
) {}
