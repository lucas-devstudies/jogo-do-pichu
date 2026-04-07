package com.jogo_do_pichu.backend.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Representa o usuário do sistema, seus dados de perfil e saldo financeiro")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único do usuário no banco de dados", example = "1")
    private Long id;

    @Schema(description = "Nome completo ou apelido do usuário", example = "Pichu Trainer")
    private String name;

    @Column(nullable = false)
    @Schema(description = "Saldo disponível para realizar apostas", example = "1000.00")
    private BigDecimal balance = BigDecimal.valueOf(1000.00);

    @Schema(description = "Endereço de e-mail único usado para login", example = "treinador@pichu.com")
    private String email;

    @Schema(description = "Senha criptografada do usuário", accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Preferência de tema da interface do usuário", example = "Dark")
    private TypeTheme theme;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @Schema(description = "Histórico completo de apostas realizadas pelo usuário")
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