package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Representa o registro completo de uma aposta realizada")
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "ID único da aposta", example = "1")
    private long id;

    @ManyToOne
    @JsonBackReference
    @Schema(description = "Usuário proprietário da aposta (Omitido no JSON para evitar recursão)")
    private User user;

    @Enumerated(EnumType.STRING)
    @Schema(description = "Categoria da aposta", example = "POKEMON ou REGION")
    private TypeBet typeBet;

    @OneToMany(mappedBy = "bet",cascade = CascadeType.ALL)
    @JsonManagedReference
    @Schema(description = "Lista de números, nomes e ids escolhidos pelo usuário")
    private List<NumBet> listNumber = new ArrayList<>();

    //valor apostado
    @Column(precision = 10, scale = 2)
    @Schema(description = "Valor investido pelo usuário na aposta", example = "10.00")
    private BigDecimal balance;

    //valor retornado
    @Column(precision = 10, scale = 2)
    @Schema(description = "Valor total retornado (Prêmio + Investimento) ou ZERO se perdeu", example = "800.00")
    private BigDecimal value;

    //quantidade que vai retornar caso ganhe
    @Schema(description = "Multiplicador aplicado em caso de vitória (baseado na quantidade de números)", example = "80")
    private int returnBet;

    @CreationTimestamp
    @Schema(description = "Data e hora em que a aposta foi processada", example = "2024-05-20T14:30:00Z")
    private Date createdAt;

    @Schema(description = "Número sorteado pelo sistema", example = "151")
    private int result;
}
