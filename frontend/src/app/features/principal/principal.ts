import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Button } from '../../core/components/button/button';
import { Opcoes } from "./opcoes/opcoes";

@Component({
  selector: 'app-principal',
  imports: [Menu, Button, Opcoes],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  nome:string = 'Ronem Lavareda';

  opcoesProx(valor:string){
    if(valor=='pokemon'){
      // abrir_card_pokemons
      alert('Pokémons selecionado')
    }
    else{
      // abrir_card_regiões
      alert('Regiões selecionada')
    }
  }
}
