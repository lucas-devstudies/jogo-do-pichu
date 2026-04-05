package com.jogo_do_pichu.backend.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(nullable = false)
    private BigDecimal balance = BigDecimal.valueOf(1000.00);

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private TypeTheme theme;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Bet> historyBet;

    public void deductBalance(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valor de aposta inválido");
        }
        if (this.balance.compareTo(amount) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saldo insuficiente para realizar a aposta");
        }
        this.balance = this.balance.subtract(amount);
    }

    public void addBalance(BigDecimal prize) {
        if (prize != null && prize.compareTo(BigDecimal.ZERO) > 0) {
            this.balance = this.balance.add(prize);
        }
    }
}