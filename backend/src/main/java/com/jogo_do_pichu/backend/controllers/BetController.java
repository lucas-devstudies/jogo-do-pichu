package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.repositories.UserRepository;
import com.jogo_do_pichu.backend.service.BetService;
import com.jogo_do_pichu.backend.domain.Bet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bet")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping("/save")
    public ResponseEntity<Bet> save(@RequestBody BetDTO betDTO, Authentication authentication){
        String email = ((User) authentication.getPrincipal()).getEmail();
        return ResponseEntity.ok(betService.save(betDTO, email));
    }
    @GetMapping("/findMyBets")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Bet>> findMyBets(Authentication authentication){
        String email = ((User) authentication.getPrincipal()).getEmail();
        return ResponseEntity.ok(betService.findMyBets(email));
    }
}
