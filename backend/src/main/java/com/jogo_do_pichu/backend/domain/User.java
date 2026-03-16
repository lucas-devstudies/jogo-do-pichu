package com.jogo_do_pichu.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private String id;
    private String name;

    @Column(nullable = false)
    private BigDecimal balance = BigDecimal.valueOf(1000.00);

    private String email;
    private String password;

    private String theme;

    @OneToMany(mappedBy = "user")
    private List<Bet> historyBet;
}