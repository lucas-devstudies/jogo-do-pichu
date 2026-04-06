package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;
import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import com.jogo_do_pichu.backend.service.util.BetNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BetNumberGenerator numberGenerator;

    @Transactional
    public Bet save(BetDTO dto, String email) {
        User user = userRepository.findByEmailWithLock(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        user.deductBalance(dto.balance());

        Bet bet = toEntity(dto);
        bet.setUser(user);
        validateBet(bet);

        int result = numberGenerator.generate(bet.getTypeBet().getSizeBet());
        bet.setResult(result);
        bet.setReturnBet(factor(bet));

        if (dto.listNumber() != null) {
            List<NumBet> numBets = dto.listNumber().stream()
                    .map(n -> new NumBet(n.getNumber(), bet, n.getName()))
                    .toList();
            bet.setListNumber(numBets);
        }

        if (win(bet, result)) {
            BigDecimal prize = returnBet(bet);
            bet.setValue(prize);
            user.addBalance(prize);
        } else {
            bet.setValue(BigDecimal.ZERO);
        }

        return betRepository.save(bet);
    }

    public Page<Bet> findMyBets(String email, int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return betRepository.findByUserEmailWithNumbers(email, pageable);
    }
    private void validateBet(Bet bet) {
        if (bet.getBalance().compareTo(BigDecimal.valueOf(0)) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"O valor apostado deve ser ao menos 1 real");
        }
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
        BigDecimal prize = BigDecimal.valueOf(bet.getReturnBet()).multiply(bet.getBalance());
        return prize.add(bet.getBalance());
    }
    private boolean win(Bet bet, int result){
        return bet.getListNumber().stream().anyMatch(n -> n.getNumber() == result);
    }
}
