import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user-service';
import { Menu } from "../../core/components/menu/menu";
import { CommonModule } from '@angular/common';
import { Pokemons } from './pokemons/pokemons';
import { Options } from "./options/options";
import { Cities } from './cities/cities';

@Component({
  selector: 'app-home',
  imports: [Pokemons, Cities, Options, Menu, CommonModule, Options],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  userService = inject(UserService);
  me$ = this.userService.me();

  atual:'home' | 'city' | 'pokemons' = 'home';

  opcoesProx(valor:string){
    if(valor=='pokemon'){
      this.atual = 'pokemons';
    }
    else{
      this.atual='city';
    }
  }
  back(){
    this.atual='home';
  }
}
