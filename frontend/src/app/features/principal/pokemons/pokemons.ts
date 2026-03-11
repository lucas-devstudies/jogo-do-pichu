import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { Button } from "../../../core/components/button/button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { PokemonCard } from "./pokemon-card/pokemon-card";
import { CommonModule } from '@angular/common';
import { ModalResults } from "../../../shared/components/modal-results/modal-results";
import { BackButton } from "../../../shared/components/back-button/back-button";

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

  private pokeAPIService = inject(PokeapiService);

  input_text:string="";
  value:number=0;

  start:number=0;

  escolhida: string = 'aa';
  results:'confirm' | 'win'|'lose' | 'result'| 'none' = 'none';

  pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
  pokemonNumber$ = this.pokeAPIService.getNumberPokemon();

  @Output() voltar = new EventEmitter<string>();
  
  change(){
    this.results='confirm';
  }
  back(){
    this.voltar.emit("voltar");
  }
  nextPokemons(){
    if(this.start<=1326){
      this.start+=24;
      this.pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
    }
  }
  backPokemons(){
    if(this.start>24){
      this.start-=24;
      this.pokemons$ = this.pokeAPIService.getPokemons(24, this.start);
    }
  }
  search(){

  }
  formatedValue(value:number){
    return value*4000.00;
  }
  next(){
    this.results='win';
  }
}