package com.jogo_do_pichu.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table
@AllArgsConstructor
@NoArgsConstructor
public class NumBet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private long id;
    private int number;

    @ManyToOne
    private Bet bet;
}
