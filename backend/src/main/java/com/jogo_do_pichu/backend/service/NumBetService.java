package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.NumBet;
import org.springframework.stereotype.Service;

@Service
public class NumBetService {

    public String save(NumBet numBet){
        return "Carro salvo com sucesso";
    }
}
