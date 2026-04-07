package com.jogo_do_pichu.backend.dto;

import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.List;

@Schema(description = "Objeto de transferência para criação de uma nova aposta")
public record BetDTO (

        @Schema(description = "Modalidade da aposta", example = "POKEMON")
        TypeBet typeBet,

        @Schema(description = "Lista de números escolhidos. O tamanho deve respeitar o limite do TypeBet.")
        List<NumBet> listNumber,

        @Schema(description = "Valor em dinheiro que será apostado (deduzido do saldo)", example = "50.00")
        BigDecimal balance
){}
