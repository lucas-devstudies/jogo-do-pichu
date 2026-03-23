package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Bet save(BetDTO dto, String email) {

        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuário não encontrado com o e-mail: " + email));

        Bet bet = toEntity(dto);
        bet.setUser(user);

        //Verificação se os valores são válidos
        validateBet(bet);

        //Sorteando valores e adicionando ao resultado
        int value = randomBet(bet);
        bet.setResult(value);

        if (dto.listNumber() != null) {
            List<NumBet> numBets = dto.listNumber().stream()
                    .map(n -> new NumBet(n.getNumber(), bet))
                    .toList();

            bet.setListNumber(numBets);
        }
        return betRepository.save(bet);
    }

    private int randomBet(Bet bet) {
        int max_bet = bet.getTypeBet().getMaxBet();
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
