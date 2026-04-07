package com.jogo_do_pichu.backend.controllers;

import com.jogo_do_pichu.backend.domain.User;
import com.jogo_do_pichu.backend.dto.BetDTO;
import com.jogo_do_pichu.backend.service.BetService;
import com.jogo_do_pichu.backend.domain.Bet;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bet")
@CrossOrigin(origins = "*")
@Tag(name = "Apostas", description = "Endpoints para realização e consulta de apostas (Bets)")
public class BetController {

    @Autowired
    private BetService betService;

    @Operation(
            summary = "Realiza uma nova aposta",
            description = "Deduz o saldo do usuário, gera um resultado aleatório e processa a premiação caso vença."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aposta processada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Saldo insuficiente ou dados da aposta inválidos"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    @PostMapping("/save")
    public ResponseEntity<Bet> save(@RequestBody BetDTO betDTO, Authentication authentication){
        String email = ((User) authentication.getPrincipal()).getEmail();
        return ResponseEntity.ok(betService.save(betDTO, email));
    }
    @Operation(
            summary = "Lista histórico de apostas",
            description = "Retorna uma página de apostas realizadas pelo usuário logado (paginação de 5 itens)."
    )
    @GetMapping("/findMyBets")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<Bet>> findMyBets(Authentication authentication, @RequestParam(defaultValue = "0") int page){
        String email = ((User) authentication.getPrincipal()).getEmail();
        return ResponseEntity.ok(betService.findMyBets(email,page));
    }
}
