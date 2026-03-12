//package com.jogo_do_pichu.backend.domain;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import java.util.Date;
//import java.util.List;
//
//@Table
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Bet {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private long id;
//
//    private long id_user;
//
//    private int typeBet;
//
//    @OneToMany(mappedBy = "numbet")
//    @JoinColumn(name="numbet_id")
//    private List<NumBet> listNumber;
//    private Date dateHours;
//    private int result;
//}
