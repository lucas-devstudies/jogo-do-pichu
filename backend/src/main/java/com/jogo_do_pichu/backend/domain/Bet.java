package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Table
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private TypeBet typeBet;

    @OneToMany(mappedBy = "bet")
    private List<NumBet> listNumber;

    @Column(precision = 10, scale = 2)
    private BigDecimal value;

    @CreationTimestamp
    private Date createdAt;
    private int result;
}
