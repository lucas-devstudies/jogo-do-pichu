package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.TypeTheme;

import java.math.BigDecimal;

public record MeDTO(String name, BigDecimal balance,String email, TypeTheme theme) {}
