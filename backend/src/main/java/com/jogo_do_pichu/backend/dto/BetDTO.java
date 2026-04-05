package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;

import java.math.BigDecimal;
import java.util.List;

public record BetDTO (TypeBet typeBet, List<NumBet> listNumber, BigDecimal balance){
}
