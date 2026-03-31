import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input() isLimitExceeded: boolean = false; // O pai avisa se o limite estourou
  
  @Output() returnId = new EventEmitter<number>(); 
  @Output() showLimitMessage  = new EventEmitter<Boolean>();

  selected: boolean = false; // Estado interno

  clicked() {
    if (this.selected) {
      // Se já está selecionado, eu SEMPRE permito desmarcar (remover da lista)
      this.selected = false;
      this.returnId.emit(0); // Avisei o pai para remover (usando 0 como flag de remoção)
    } 
    else {
      // Se NÃO está selecionado, eu verifico o limite do pai
      if (this.isLimitExceeded) {
        this.showLimitMessage.emit(true);
        // NÃO mudo o this.selected para true, impedindo a cor de mudar
        return; 
      }
      
    // Se passou no teste do limite, eu marco e aviso o pai
    this.selected = true;
    this.returnId.emit(this.id); // Avisei o pai para adicionar
    }
  }
}