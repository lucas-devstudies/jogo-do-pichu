import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {

  @Input()
  id!:number;

  @Input()
  img!:string;

  @Input()
  name!:string;
}
