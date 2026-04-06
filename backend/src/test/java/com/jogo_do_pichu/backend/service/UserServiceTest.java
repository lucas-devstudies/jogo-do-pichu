package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.TypeTheme;
import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.RegisterRequestDTO;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    //Teste para Salvar corretamente o usuário
    @Test
    void save_ShouldCreateUser_WhenDataIsValid() {
        RegisterRequestDTO request = new RegisterRequestDTO("Pichu", "pichu@gmail.com", "123456", TypeTheme.Dark);
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.password())).thenReturn("senha_criptografada");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User savedUser = userService.save(request);

        assertNotNull(savedUser);
        assertEquals("Pichu", savedUser.getName());
        assertEquals("pichu@gmail.com", savedUser.getEmail());
        assertEquals("senha_criptografada", savedUser.getPassword());
        assertEquals(0, BigDecimal.valueOf(1000.00).compareTo(savedUser.getBalance()));
        verify(userRepository, times(1)).save(any(User.class));
    }

    //Teste pra não cadastrar usuário com email já cadastrado
    @Test
    void save_ShouldThrowConflict_WhenEmailAlreadyExists() {
        RegisterRequestDTO request = new RegisterRequestDTO("Pichu", "pichu@email.com", "123456", TypeTheme.Dark);
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(new User()));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            userService.save(request);
        });

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Usuário já cadastrado", exception.getReason());
        verify(userRepository, never()).save(any());
    }
    //Teste para não salvar o usuário quando a senha for muito pequena
    @Test
    void save_ShouldThrowBadRequest_WhenPasswordIsShort() {
        RegisterRequestDTO request = new RegisterRequestDTO("Pichu", "pichu@email.com", "123", TypeTheme.Dark);
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            userService.save(request);
        });

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertTrue(exception.getReason().contains("pelo menos 6 caracteres"));
    }
    //Teste para não aceitar email inválido
    @Test
    void save_ShouldThrowBadRequest_WhenEmailIsInvalid() {
        RegisterRequestDTO request = new RegisterRequestDTO("Pichu", "email_errado.com", "123456", TypeTheme.Dark);
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            userService.save(request);
        });

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertEquals("O formato do e-mail é inválido", exception.getReason());
    }
    //Teste para não aceitar usuário sem nome
    @Test
    void save_ShouldThrowBadRequest_WhenNameIsEmpty() {
        RegisterRequestDTO request = new RegisterRequestDTO("", "pichu@email.com", "123456", TypeTheme.Dark);
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            userService.save(request);
        });

        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertEquals("O usuário deve possuir um nome", exception.getReason());
    }
}
