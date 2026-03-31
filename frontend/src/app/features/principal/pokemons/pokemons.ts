import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
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
import { catchError, map } from 'rxjs';
import { UserDTO } from '../../../shared/models/UserDTO';

declare var bootstrap: any;


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

  constructor(private cdr: ChangeDetectorRef){}

  private pokeAPIService = inject(PokeapiService);

  messageToast:string = "";

  bet:Bet = new Bet();
  betDTO:BetDTO = {
    balance:0,
    listNumber:[],
    typeBet:'POKEMON'
  };

  conf:boolean = false
  sortPokemon: Pokemon = {
    id : 0,
    name : "",
    img : ""
  };

  @Input()
  userDTO!:UserDTO;

  input_text:string="";
  start:number=0;

  escolhida: string = 'aa';
  results: 'confirm' | 'win' | 'lose' | 'result'| 'none' | 'drawn' = 'none';

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
    this.results='confirm';
  }
  search() {
    const term = this.input_text.trim().toLowerCase();

    if (term === '') {
      this.start = 0; 
      this.pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
      return;
    }

    this.pokemons$ = this.pokeAPIService.findPokemon(term).pipe(
      map(pokemon => [pokemon]), 
      catchError(err => {
        this.showToast("Pokémon não encontrado!");
        return this.pokeAPIService.getPokemons(24, this.start);
      })
    );
  }
  showLimit(){
    this.showToast("Você atingiu o limite de seleções!");
  }
  next(){
    this.pokeAPIService.postBet(this.betDTO).subscribe({
      next:(bet)=> {
        this.bet = bet;
        console.log(bet);
        this.pokeAPIService.findPokemon(this.bet.result).subscribe({
          next:(pokemon)=> {
            this.sortPokemon = pokemon;
            this.results='drawn';
            this.cdr.detectChanges();
          },error:(err)=>{
            this.showToast("Resultado não encontrado");
          }
        })        
      },error:(err)=> {
        this.showToast(err.error.message);
        console.log("deu aqui aqui",err);
      },
    })
  }
  back(){
    this.voltar.emit("voltar");
  }
  formatedValue(value:number):number{
    return value*this.factor(this.betDTO);
  }
  openResult(){
    if(this.bet.value==0){
      this.results='lose';
    }else{
      this.results='win';
    }
  }
  showResult(){
    this.results='result';
  }
  closeModal(){
    this.back();
  }

  factor(betDTO:BetDTO):number{
      switch(betDTO.listNumber.length){
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
  togglerPokemon(pokemon: Pokemon) {
    const config = TypeBet[this.betDTO.typeBet as keyof typeof TypeBet];    
    const index = this.betDTO.listNumber.findIndex(p => p.number === pokemon.id);

    if (index !== -1) {
        this.betDTO.listNumber.splice(index, 1);
        
       this.betDTO.listNumber = [...this.betDTO.listNumber];
        
    } else {
        if (this.betDTO.listNumber.length < config.maxBet) {
            const nb: NumBet = {
                number: pokemon.id,
                name:pokemon.name
            };
            this.betDTO.listNumber.push(nb);
            
            this.betDTO.listNumber = [...this.betDTO.listNumber];
        } else {
            this.showToast(`Limite de ${config.maxBet} atingido!`);
        }
    }
  }
  get isMaxLimitExceeded(): boolean {
    const config = TypeBet[this.betDTO.typeBet as keyof typeof TypeBet];
    return this.betDTO.listNumber.length >= config.maxBet;
  }
  get formatedList(): string {
    const nomes = this.betDTO.listNumber
      .map(p => p.name) 
      .filter(n => !!n); 

    return nomes.length > 0 ? nomes.join(', ') : 'Nenhum selecionado';
  }
  closeConfModal(conf:boolean){
    if(conf==false){
      this.results='none';
    }
  }
  @ViewChild('liveToast', { static: true }) toastElement!: ElementRef;

  showToast(text: string) {
    this.messageToast = text;
    
    this.cdr.detectChanges();

    const toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);
    toastInstance.show();
  }
}