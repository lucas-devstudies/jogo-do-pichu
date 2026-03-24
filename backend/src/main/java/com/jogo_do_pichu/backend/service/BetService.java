package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;
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

import java.math.BigDecimal;
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
        int result = randomBet(bet);
        bet.setResult(result);

        //Inserindo o Retorno Esperado
        bet.setReturnBet(factor(bet));

        if (dto.listNumber() != null) {
            List<NumBet> numBets = dto.listNumber().stream()
                    .map(n -> new NumBet(n.getNumber(), bet,n.getName()))
                    .toList();

            bet.setListNumber(numBets);
        }
        if(win(bet,result)){
            bet.setValue(returnBet(bet));
            user.addBalance(bet.getValue());
        }else{
            bet.setValue(BigDecimal.valueOf(0L));
            user.deductBalance(dto.balance());
        }
        return betRepository.save(bet);
    }

    public List<Bet> findMyBets(String email){
        return betRepository.findByUserEmailWithNumbers(email);
    }
    private int randomBet(Bet bet) {
        //Para uso normal
        int max_bet = bet.getTypeBet().getSizeBet();

        //Para teste com bumbassaur
        //int max_bet = 2;
        return ThreadLocalRandom.current().nextInt(1, max_bet+1);
    }

    private void validateBet(Bet bet) {
        if (bet.getListNumber().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aposta vazia");
        }
        if (bet.getListNumber().size() > bet.getTypeBet().getMaxBet()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade de números para aposta é inválida");
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
        bet.setBalance(dto.balance());

        List<NumBet> list = dto.listNumber().stream()
                .map(n -> {
                    NumBet nb = new NumBet();
                    nb.setNumber(n.getNumber());
                    nb.setBet(bet);
                    nb.setName(n.getName());
                    return nb;
                })
                .toList();

        bet.setListNumber(list);

        return bet;
    }

    private int factor(Bet bet) {
        int factor = 0;

        if (bet.getTypeBet() == TypeBet.POKEMON) {
            factor = switch (bet.getListNumber().size()) {
                case 1 -> 1000;
                case 2 -> 400;
                case 3 -> 300;
                case 4 -> 200;
                case 5 -> 80;
                default -> 0;
            };
        } else {
            factor = switch (bet.getListNumber().size()) {
                case 1 -> 7;
                case 2 -> 3;
                default -> 0;
            };
        }
        if (factor == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade de números apostados é inválida");
        }

        return factor;
    }

    private BigDecimal returnBet(Bet bet){
        return BigDecimal.valueOf(bet.getReturnBet()).multiply(bet.getBalance());
    }

    private boolean win(Bet bet, int result){
        return bet.getListNumber().stream().anyMatch(n -> n.getNumber() == result);
    }
}
