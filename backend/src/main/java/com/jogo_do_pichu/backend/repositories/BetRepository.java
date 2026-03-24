package com.jogo_do_pichu.backend.repositories;

import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BetRepository extends JpaRepository<Bet,Long> {

    @Query("SELECT b FROM Bet b JOIN FETCH b.listNumber WHERE b.user.email = :email")
    List<Bet> findByUserEmailWithNumbers(@Param("email") String email);
}