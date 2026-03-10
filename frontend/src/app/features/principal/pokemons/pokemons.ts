import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { Router } from '@angular/router';
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

  constructor(
    private router:Router,
  ){}
  
  @Input()

  card:string="";
  valor:number=0;

  escolhida: string = 'pokemon';
  results:'confirm'|'none'='none';

  pokemons$ = this.pokeAPIService.getPokemons(24, 0);
  pokemonNumber$ = this.pokeAPIService.getNumberPokemon();

  @Output() voltar = new EventEmitter<string>();

  
  change(){
    this.results='confirm';
  }
  back(){
    this.voltar.emit("voltar");
  }
}