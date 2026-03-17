package com.jogo_do_pichu.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

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
    private List<Bet> historyBet;
}