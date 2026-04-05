package com.jogo_do_pichu.backend.repositories;

import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BetRepository extends JpaRepository<Bet,Long> {

    @EntityGraph(attributePaths = {"listNumber"})
    @Query("SELECT b FROM Bet b WHERE b.user.email = :email")
    Page<Bet> findByUserEmailWithNumbers(@Param("email") String email, Pageable pageable);
}