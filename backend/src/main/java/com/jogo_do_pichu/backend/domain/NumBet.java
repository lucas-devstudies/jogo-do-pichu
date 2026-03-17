package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    //Tem o cascade persiste pra que eu consiga salvar aposta sem precisar salvar cada número individualmente
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties("listNumber")
    private Bet bet;
}
