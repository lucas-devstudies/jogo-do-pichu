import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { Router } from '@angular/router';
import { Button } from "../../../core/components/button/button";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { PokemonCard } from "./pokemon-card/pokemon-card";
import { CommonModule } from '@angular/common';

interface Pokemon{
  id:number;
  name:string;
  img:string;
}

@Component({
  selector: 'app-pokemons',
  imports: [Button, CustomInput, PokemonCard,CommonModule],
  templateUrl: './pokemons.html',
  styleUrl: './pokemons.css',
})
export class Pokemons {

  private pokeAPIService = inject(PokeapiService);

  constructor(
    private router:Router,
    private cdr: ChangeDetectorRef
  ){
    this.pokeAPIService.getNumberPokemon().subscribe(res=>{
      this.pokemonNumber=res;
    });
  }
  
  @Input()

  card:string="";
  valor:number=0;

  pokemonNumber!:number;
  escolhida: string = 'pokemon';

  pokemons$ = this.pokeAPIService.getPokemons(21, 0);

  @Output() opcaoSelecionada = new EventEmitter<string>();
  @Output() voltar = new EventEmitter<string>();

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }

  back(){
    this.voltar.emit("voltar");
  }
}