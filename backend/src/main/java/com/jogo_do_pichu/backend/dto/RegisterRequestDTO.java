package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.TypeTheme;

public record RegisterRequestDTO (String name, String email, String password, TypeTheme theme){}
