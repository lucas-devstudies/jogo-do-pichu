//package com.jogo_do_pichu.backend.controllers;
//
//import com.jogo_do_pichu.backend.domain.NumBet;
//import com.jogo_do_pichu.backend.service.NumBetService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/numbet")
//public class NumBetController {
//
//    @Autowired
//    private NumBetService numBetService;
//
//    @PostMapping("/save")
//    public ResponseEntity<String> save(@RequestBody NumBet numBet){
//        try{
//            String mensagem = this.numBetService.save(numBet);
//            return new ResponseEntity<String>(mensagem, HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<String>("Deu algo errado ao salvar!",HttpStatus.BAD_REQUEST);
//        }
//    }
//}
