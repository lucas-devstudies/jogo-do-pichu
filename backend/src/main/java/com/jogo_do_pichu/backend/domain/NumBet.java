package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Representa cada número individual escolhido em uma aposta")
public class NumBet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único do registro do número", example = "42")
    private long id;

    @Schema(description = "O número escolhido pelo usuário para a aposta", example = "25")
    private long number;

    @Schema(description = "O nome associado ao número (ex: Nome do Pokémon ou Região)", example = "Pikachu")
    private String name;

    //Tem o cascade persiste pra que eu consiga salvar aposta sem precisar salvar cada número individualmente
    @ManyToOne
    @JsonBackReference
    @Schema(description = "Referência à aposta pai (Omitido no JSON para evitar loop infinito)")
    private Bet bet;

    public NumBet(long number, Bet bet,String name) {
        this.number = number;
        this.bet = bet;
        this.name = name;
    }
}
