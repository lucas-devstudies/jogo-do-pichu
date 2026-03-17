package com.jogo_do_pichu.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum TypeBet {
    POKEMON("Pokemon",1025,5,1000),
    REGION("Region",10,2,7);

    private final String name;
    private final int sizeBet;
    private final int maxBet;
    private final int returnBet;
}
