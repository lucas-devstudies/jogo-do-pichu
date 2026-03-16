package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    public String save(Bet bet){

        this.betRepository.save(bet);
        return "Cadastro Realizado com sucesso";
    }
}
