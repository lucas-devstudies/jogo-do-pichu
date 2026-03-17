package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    public Bet save(BetDTO dto) {
        Bet bet = toEntity(dto);

        int value = randomBet(bet.getTypeBet().getMaxBet()+1);
        bet.setResult(value);

        return betRepository.save(bet);
    }

    private int randomBet(int max_bet) {
        return ThreadLocalRandom.current().nextInt(1, max_bet);
    }
    private void validateBet(Bet bet) {
        if (bet.getListNumber().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aposta vazia");
        }
        if (bet.getListNumber().size() != bet.getTypeBet().getMaxBet()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade inválida");
        }
        for (NumBet b : bet.getListNumber()) {
            if (b.getNumber() <= 0 || b.getNumber() > bet.getTypeBet().getSizeBet()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Número inválido");
            }
        }
    }
    private Bet toEntity(BetDTO dto) {

        Bet bet = new Bet();
        bet.setTypeBet(dto.typeBet());
        bet.setValue(dto.value());

        List<NumBet> list = dto.listNumber().stream()
                .map(n -> {
                    NumBet nb = new NumBet();
                    nb.setNumber(n.getNumber());
                    nb.setBet(bet);
                    return nb;
                })
                .toList();

        bet.setListNumber(list);

        return bet;
    }
}
