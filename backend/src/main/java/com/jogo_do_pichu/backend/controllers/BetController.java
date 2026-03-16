package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.service.BetService;
import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bet")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Bet bet){
        try{
            String mensagem = this.betService.save(bet);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Deu algo erradao", HttpStatus.BAD_REQUEST);
        }
    }
}
