package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.controllers.BetController;
import com.jogo_do_pichu.backend.domain.Bet;
import com.jogo_do_pichu.backend.domain.NumBet;
import com.jogo_do_pichu.backend.domain.TypeBet;
import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.BetRepository;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import com.jogo_do_pichu.backend.service.util.BetNumberGenerator;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@ExtendWith(MockitoExtension.class)
class BetServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BetRepository betRepository;

    @Mock
    private BetNumberGenerator numberGenerator;

    @InjectMocks
    private BetService betService;

    private BetDTO createDto(BigDecimal balance, int numeroEscolhido) {
        Bet bet = new Bet();
        NumBet num = new NumBet(numeroEscolhido, bet, "Pikachu");

        return new BetDTO(TypeBet.POKEMON, List.of(num), balance);
    }
    //teste para não validar uma aposta porque o usuário não existe
    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        String email = "nao_existe@email.com";
        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> {
            betService.save(createDto(new BigDecimal("10"),25), email);
        });
    }
    //Teste para aposta inválido
    @Test
    void shouldThrowExceptionWhenBalanceIsZero() {
        String email = "lucas@email.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        BetDTO dto = createDto(new BigDecimal("0.00"), 1);

        ResponseStatusException ex = Assertions.assertThrows(ResponseStatusException.class, () -> {
            betService.save(dto, email);
        });

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        Assertions.assertEquals("Valor de aposta inválido", ex.getReason());
    }
    //teste de estouro de números apostados
    @Test
    void shouldThrowExceptionWhenTooManyNumbers() {
        String email = "lucas@email.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));
        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));

        BigDecimal valorValido = new BigDecimal("10.00");
        List<NumBet> manyNumbers = new ArrayList<>();
        for(int i=1; i<=6; i++) {
            manyNumbers.add(new NumBet(i, new Bet(), "Pichu"));
        }

        BetDTO dto = new BetDTO(TypeBet.POKEMON, manyNumbers, valorValido);
        ResponseStatusException ex = Assertions.assertThrows(ResponseStatusException.class, () -> {
            betService.save(dto, email);
        });

        Assertions.assertEquals("A quantidade de números para aposta é inválida", ex.getReason());
    }
    //Teste para número inválido
    @Test
    void shouldThrowExceptionWhenNumberIsOutOfRange() {
        String email = "lucas@email.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        BetDTO dto = createDto(new BigDecimal("10.00"), 1026);

        ResponseStatusException ex = Assertions.assertThrows(ResponseStatusException.class, () -> {
            betService.save(dto, email);
        });

        Assertions.assertEquals("Número inválido", ex.getReason());
    }
    //teste para validar aposta, com o resultado sendo derrota
    @Test
    void shouldDecreaseBalanceWhenBetIsLost() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(50);
        Mockito.when(betRepository.save(Mockito.any(Bet.class))).thenAnswer(i -> i.getArgument(0));

        BetDTO dto = createDto(new BigDecimal("10.00"), 1);
        betService.save(dto, email);

        BigDecimal expectedBalance = new BigDecimal("90.00");
        Assertions.assertEquals(expectedBalance, user.getBalance(), "O saldo deveria ser apenas subtraído em caso de derrota");
    }
    //teste para validar aposta, com o resultado sendo vitória
    @Test
    void shouldIncreaseBalanceWhenBetIsWon() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(25);
        Mockito.when(betRepository.save(Mockito.any(Bet.class))).thenAnswer(i -> i.getArgument(0));

        betService.save(createDto(new BigDecimal("10.00"), 25), email);

        BigDecimal expectedBalance = new BigDecimal("10100.00");
        Assertions.assertEquals(expectedBalance, user.getBalance(), "O saldo deve ser: 100 + (10*1000)");
        Mockito.verify(betRepository, Mockito.times(1)).save(Mockito.any(Bet.class));
    }
    //Retorno de página de aposta
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
    //TESTES PARA NÚMERO DE APOSTAS

    //Aposta vitoriosa com 5 pokémons
    @Test
    void shouldCalculatePrizeForPokemonWith5Numbers() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        List<NumBet> nums = IntStream.rangeClosed(1, 5)
                .mapToObj(i -> new NumBet(i, new Bet(), "Pichu"))
                .toList();

        BetDTO dto = new BetDTO(TypeBet.POKEMON, nums, new BigDecimal("10.00"));

        betService.save(dto, "test@test.com");
        Assertions.assertEquals(new BigDecimal("900.00"), user.getBalance());
    }
    //Aposta vitoriosa com 4 pokémons
    @Test
    void shouldCalculatePrizeForPokemonWith4Numbers() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        List<NumBet> nums = IntStream.rangeClosed(1, 4)
                .mapToObj(i -> new NumBet(i, new Bet(), "Pichu"))
                .toList();

        BetDTO dto = new BetDTO(TypeBet.POKEMON, nums, new BigDecimal("10.00"));

        betService.save(dto, "test@test.com");
        Assertions.assertEquals(new BigDecimal("2100.00"), user.getBalance());
    }
    //Aposta vitoriosa com 3 pokémons
    @Test
    void shouldCalculatePrizeForPokemonWith3Numbers() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);
        Mockito.when(betRepository.save(Mockito.any(Bet.class))).thenAnswer(i -> i.getArgument(0));

        List<NumBet> nums = IntStream.rangeClosed(1, 3)
                .mapToObj(i -> new NumBet(i, new Bet(), "Pichu"))
                .toList();

        BetDTO dto = new BetDTO(TypeBet.POKEMON, nums, new BigDecimal("10.00"));

        betService.save(dto, email);
        Assertions.assertEquals(new BigDecimal("3100.00"), user.getBalance());
    }
    //Aposta vitoriosa com 2 pokémons
    @Test
    void shouldCalculatePrizeForPokemonWith2Numbers() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        List<NumBet> nums = IntStream.rangeClosed(1, 2)
                .mapToObj(i -> new NumBet(i, new Bet(), "Pichu"))
                .toList();

        BetDTO dto = new BetDTO(TypeBet.POKEMON, nums, new BigDecimal("10.00"));

        betService.save(dto, "test@test.com");
        Assertions.assertEquals(new BigDecimal("4100.00"), user.getBalance());
    }
    //Aposta vitoriosa com 1 pokémon
    @Test
    void shouldCalculatePrizeForPokemonWith1Number() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        List<NumBet> nums = IntStream.rangeClosed(1, 1)
                .mapToObj(i -> new NumBet(i, new Bet(), "Pichu"))
                .toList();

        BetDTO dto = new BetDTO(TypeBet.POKEMON, nums, new BigDecimal("10.00"));

        betService.save(dto, "test@test.com");
        Assertions.assertEquals(new BigDecimal("10100.00"), user.getBalance());
    }
    //Aposta com lista vazia
    @Test
    void shouldThrowExceptionWhenListIsEmpty() {
        String email = "lucas@email.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));
        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));

        // Lista vazia
        BetDTO dto = new BetDTO(TypeBet.POKEMON, List.of(), new BigDecimal("10.00"));

        ResponseStatusException ex = Assertions.assertThrows(ResponseStatusException.class, () -> {
            betService.save(dto, email);
        });

        Assertions.assertEquals("Aposta vazia", ex.getReason());
    }
    //Apposta com uma região
    @Test
    void shouldCalculatePrizeForRegionWith1Number() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        // Simulando um TypeBet que não seja POKEMON
        List<NumBet> nums = List.of(new NumBet(1, new Bet(), "Kanto"));
        BetDTO dto = new BetDTO(TypeBet.REGION, nums, new BigDecimal("10.00"));

        betService.save(dto, email);
        Assertions.assertEquals(new BigDecimal("170.00"), user.getBalance());
    }
    @Test
    void shouldCalculatePrizeForRegionWith2Number() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));

        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));
        Mockito.when(numberGenerator.generate(Mockito.anyInt())).thenReturn(1);

        // Simulando um TypeBet que não seja POKEMON
        List<NumBet> nums = List.of(new NumBet(1, new Bet(), "Kanto"),new NumBet(1, new Bet(), "Kanto"));
        BetDTO dto = new BetDTO(TypeBet.REGION, nums, new BigDecimal("10.00"));

        betService.save(dto, email);
        Assertions.assertEquals(new BigDecimal("130.00"), user.getBalance());
    }
    //Aposta com estouro de números apostados
    @Test
    void shouldThrowExceptionWhenFactorIsZeroForRegion() {
        String email = "test@test.com";
        User user = new User();
        user.setBalance(new BigDecimal("100.00"));
        Mockito.when(userRepository.findByEmailWithLock(email)).thenReturn(Optional.of(user));

        List<NumBet> nums = IntStream.rangeClosed(1, 3)
                .mapToObj(i -> new NumBet(i, new Bet(), "Kanto"))
                .toList();
        BetDTO dto = new BetDTO(TypeBet.REGION, nums, new BigDecimal("10.00"));

        ResponseStatusException ex = Assertions.assertThrows(ResponseStatusException.class, () -> {
            betService.save(dto, email);
        });

        Assertions.assertEquals("A quantidade de números para aposta é inválida", ex.getReason());
    }

}