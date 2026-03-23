package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NumBet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int number;

    //Tem o cascade persiste pra que eu consiga salvar aposta sem precisar salvar cada número individualmente
    @ManyToOne
    @JsonBackReference
    private Bet bet;

    public NumBet(int number, Bet bet) {
        this.number = number;
        this.bet = bet;
    }
}
