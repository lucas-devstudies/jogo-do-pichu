import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from '../../../core/services/pokeapi-service';

@Component({
  selector: 'app-cidades',
  imports: [Button,CommonModule,FormsModule],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades {
  @Input()
  extraClass = '';

  cities;

  constructor(private pokeapiService:PokeapiService){
    this.cities = this.pokeapiService.regions;
  }

  
  @Output() opcaoSelecionada = new EventEmitter<string>();

  escolhida:string = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
}
