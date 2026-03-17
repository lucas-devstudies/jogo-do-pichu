package com.jogo_do_pichu.backend.service;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.MeDTO;
import com.jogo_do_pichu.backend.dto.RegisterRequestDTO;
import com.jogo_do_pichu.backend.infra.security.TokenService;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    public User save(RegisterRequestDTO body){
        Optional<User> userTest = this.userRepository.findByEmail(body.email());

        if (userTest.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuário já cadastrado");
        }

        User user = new User();
        user.setName(body.name());
        user.setBalance(BigDecimal.valueOf(1000.00));
        user.setEmail(body.email());
        user.setTheme(body.theme());
        user.setPassword(passwordEncoder.encode(body.password()));

        return this.userRepository.save(user);
    }
    public MeDTO me(User user){
        return new MeDTO(
                user.getName(),
                user.getBalance(),
                user.getEmail(),
                user.getTheme()
        );
    }
}
