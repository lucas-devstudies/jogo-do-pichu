import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Opcoes } from "./opcoes/opcoes";
import { Cidades } from "./cidades/cidades";
import { Pokemons } from "./pokemons/pokemons";

@Component({
  selector: 'app-principal',
  imports: [Menu, Opcoes, Cidades, Pokemons],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  nome:string = 'Ronem Lavareda';
  atual:'principal' | 'cidades' | 'pokemons' = 'principal';

  opcoesProx(valor:string){
    if(valor=='pokemon'){
      this.atual = 'pokemons'
    }
    else{
      this.atual='cidades';
    }
  }
  back(){
    this.atual='principal';
  }
}
