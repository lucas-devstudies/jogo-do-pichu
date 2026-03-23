package com.jogo_do_pichu.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JsonBackReference
    private User user;

    @Enumerated(EnumType.STRING)
    private TypeBet typeBet;

    @OneToMany(mappedBy = "bet",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<NumBet> listNumber = new ArrayList<>();

    @Column(precision = 10, scale = 2)
    private BigDecimal value;

    @CreationTimestamp
    private Date createdAt;
    private int result;
}
