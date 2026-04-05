import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  @Input() id!: number;
  @Input() img!: string;
  @Input() name!: string;
  @Input() isLimitExceeded: boolean = false;
  
  @Input() isSelected: boolean = false; 

  @Output() returnId = new EventEmitter<number>(); 
  @Output() showLimitMessage = new EventEmitter<Boolean>();

  clicked() {
    if (!this.isSelected && this.isLimitExceeded) {
      this.showLimitMessage.emit(true);
      return;
    }
    
    this.returnId.emit(this.id);
  }
}