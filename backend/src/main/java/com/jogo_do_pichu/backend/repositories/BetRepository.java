package com.jogo_do_pichu.backend.repositories;

import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BetRepository extends JpaRepository<Bet,Long> {

}
