package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.service.BetService;
import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bet")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping("/save")
    public ResponseEntity<Bet> save(@RequestBody BetDTO bet){

        Bet savedBet = betService.save(bet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBet);
    }
}
