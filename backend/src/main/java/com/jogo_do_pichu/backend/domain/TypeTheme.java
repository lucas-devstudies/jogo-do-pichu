package com.jogo_do_pichu.backend.domain;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Define a preferência visual da interface do usuário")
public enum TypeTheme {
    @Schema(description = "Tema claro com cores brilhantes")
    Light,

    @Schema(description = "Tema escuro para ambientes com pouca luz")
    Dark
}
