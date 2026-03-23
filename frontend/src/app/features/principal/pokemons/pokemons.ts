import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { Button } from "../../../core/components/button/button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { PokemonCard } from "./pokemon-card/pokemon-card";
import { CommonModule } from '@angular/common';
import { ModalResults } from "../../../shared/components/modal-results/modal-results";
import { BackButton } from "../../../shared/components/back-button/back-button";
import { Router } from '@angular/router';
import { Bet, BetDTO, NumBet } from '../../../shared/models/Bet';
import { TypeBet } from '../../../shared/models/TypeBet';

interface Pokemon{
  id:number;
  name:string;
  img:string;
}

@Component({
  selector: 'app-pokemons',
  imports: [Button, CustomInput, PokemonCard, CommonModule, ModalResults, BackButton],
  templateUrl: './pokemons.html',
  styleUrl: './pokemons.css',
})
export class Pokemons {


  constructor(private router:Router){}

  private pokeAPIService = inject(PokeapiService);

  bet:BetDTO = {
    balance:0,
    listNumber:[],
    typeBet:'POKEMON'
  };

  input_text:string="";

  start:number=0;

  escolhida: string = 'aa';
  results: 'confirm' | 'win' | 'lose' | 'result'| 'none' = 'none';

  pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
  pokemonNumber$ = this.pokeAPIService.getNumberPokemon();

  @Output() voltar = new EventEmitter<string>();

  nextPokemons(){
    if(this.start<=1001){
      this.start+=24;
      if(this.start==1008){
        this.pokemons$ = this.pokeAPIService.getPokemons(13, this.start);
      }else{
        this.pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
      }
    }
  }
  backPokemons(){
    if(this.start>=24){
      this.start-=24;
      this.pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
    }
  }
  change(){
    //apostar
    this.results='confirm';
  }
  next(){
    this.results='result';
    this.pokeAPIService.postBet(this.bet).subscribe({
      next(Bet:Bet) {
        alert("Deu bom");
      },error(err) {
        alert(err);
      },
    })
  }
  back(){
    this.voltar.emit("voltar");
  }
  search(){

  }
  formatedValue(value:number):number{
    return value*this.factor(this.bet);
  }
  showResult(){
    this.results='win';
  }
  closeModal(){
    this.back();
  }

  factor(bet:BetDTO):number{
    if(bet.typeBet=='POKEMON'){
      switch(bet.listNumber.length){
        case 1: 
          return 1000;

        case 2:
          return 500;
        
        case 3:
          return 300;
        
        case 4:
          return 200;
        
        case 5:
          return 80;

        default:
          return 1000;
      }
    } 
    else{
      switch(bet.listNumber.length){
        case 1:
          return 7;
        
        case 2:
          return 3;
        
        default:
          return 7;
      }
    }
  }
  togglerPokemon(pokemon: Pokemon) {
    const config = TypeBet[this.bet.typeBet as keyof typeof TypeBet];
    
    // 1. IMPORTANTE: Busque pelo campo 'number', que é onde você guardou o id do pokemon
    const index = this.bet.listNumber.findIndex(p => p.number === pokemon.id);

    console.log("Index encontrado:", index); // Debug: se der -1, a busca falhou

    if (index !== -1) {
        // 2. REMOÇÃO REAL: 
        // O splice modifica o array original. 
        this.bet.listNumber.splice(index, 1);
        
        // 3. SE ESTIVER USANDO ANGULAR 16+:
        // Force a atualização da referência para o Angular "perceber" a mudança
        this.bet.listNumber = [...this.bet.listNumber];
        
    } else {
        // 4. ADIÇÃO:
        if (this.bet.listNumber.length < config.maxBet) {
            // Crie o objeto exatamente como o DTO espera
            const nb: NumBet = {
                number: pokemon.id
            };
            this.bet.listNumber.push(nb);
            
            // Force a atualização da referência aqui também
            this.bet.listNumber = [...this.bet.listNumber];
        } else {
            alert(`Limite de ${config.maxBet} atingido!`);
        }
    }
  }
  get isMaxLimitExceeded(): boolean {
    const config = TypeBet[this.bet.typeBet as keyof typeof TypeBet];
    return this.bet.listNumber.length >= config.maxBet;
  }
}