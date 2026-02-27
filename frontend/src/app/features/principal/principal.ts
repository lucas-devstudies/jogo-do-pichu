import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Opcoes } from "./opcoes/opcoes";
import { Cidades } from "./cidades/cidades";

@Component({
  selector: 'app-principal',
  imports: [Menu, Opcoes, Cidades],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  nome:string = 'Ronem Lavareda';
  atual:'principal' | 'cidades' = 'principal';
  
  opcoesProx(valor:string){
    if(valor=='pokemon'){
      // abrir_card_pokemons
      alert('Pokémons selecionado')
      
    }
    else{
      // abrir_card_regiões
      // alert('Regiões selecionada')
      this.atual='cidades';
    }
  }
}
