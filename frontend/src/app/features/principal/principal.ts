import { Component, inject } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Opcoes } from "./opcoes/opcoes";
import { Cidades } from "./cidades/cidades";
import { Pokemons } from "./pokemons/pokemons";
import { UserService } from '../../core/services/user-service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [Menu, Opcoes, Cidades, Pokemons,CommonModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {

  userService = inject(UserService);
  me$ = this.userService.me();

  atual:'principal' | 'cidades' | 'pokemons' = 'principal';

  opcoesProx(valor:string){
    if(valor=='pokemon'){
      this.atual = 'pokemons';
    }
    else{
      this.atual='cidades';
    }
  }
  back(){
    this.atual='principal';
  }
}
