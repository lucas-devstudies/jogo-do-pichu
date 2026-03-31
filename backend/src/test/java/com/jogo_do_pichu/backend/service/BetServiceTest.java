package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.controllers.BetController;
import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;
import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class BetServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BetRepository betRepository;

    @InjectMocks
    private BetService betService;

    private BetDTO createDto(BigDecimal balance) {
        Bet bet = new Bet();
        return new BetDTO(TypeBet.POKEMON,List.of(new NumBet(1,bet,"Pikachu")),balance);
    }

    @Test
    void shouldSaveBetSuccessfully() {
        String email = "lucas@email.com";
        BigDecimal saldoInicial = new BigDecimal("100.00");
        BigDecimal valorAposta = new BigDecimal("10.00");

        User user = new User();
        user.setEmail(email);
        user.setBalance(saldoInicial);

        BetDTO dto = createDto(valorAposta);

        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        Mockito.when(betRepository.save(Mockito.any(Bet.class))).thenAnswer(i -> i.getArgument(0));

        Bet result = betService.save(dto, email);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(user, result.getUser());
        Assertions.assertNotNull(result.getResult(), "O resultado do sorteio não deve ser nulo");

        Assertions.assertNotEquals(saldoInicial, user.getBalance(), "O saldo do usuário deveria ter sido atualizado");

        Mockito.verify(betRepository, Mockito.times(1)).save(Mockito.any(Bet.class));
    }
    @Test
    void shouldReturnPageOfBetsWhenEmailExists() {
        String email = "test@gmail.com";
        Pageable pageable = PageRequest.of(0, 5);
        List<Bet> bets = List.of(new Bet());
        Page<Bet> pageMock = new PageImpl<>(bets);

        Mockito.when(betRepository.findByUserEmailWithNumbers(email, pageable))
                .thenReturn(pageMock);

        Page<Bet> result = betService.findMyBets(email, 0);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.getContent().size());
        Mockito.verify(betRepository, Mockito.times(1)).findByUserEmailWithNumbers(email, pageable);
    }
    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        String email = "nao_existe@email.com";
        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> {
            betService.save(createDto(new BigDecimal("10")), email);
        });
    }
    @Test
    void shouldHandleBalanceCorrectlyAfterSave() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        Mockito.when(betRepository.save(Mockito.any(Bet.class))).thenAnswer(i -> i.getArgument(0));

        Bet result = betService.save(createDto(new BigDecimal("10.00")), email);

        if (result.getValue().compareTo(BigDecimal.ZERO) > 0) {
            Assertions.assertTrue(user.getBalance().compareTo(new BigDecimal("100.00")) > 0, "Ganhou mas o saldo não subiu!");
        } else {
            Assertions.assertEquals(new BigDecimal("90.00"), user.getBalance(), "Perdeu mas o saldo não descontou!");
        }
    }
}