import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcoes',
  imports: [Button, FormsModule,CommonModule],
  templateUrl: './opcoes.html',
  styleUrl: './opcoes.css',
})
export class Opcoes {
  @Input()
  extraClass = '';

  @Output() opcaoSelecionada = new EventEmitter<string>();

  escolhida:string = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
}
