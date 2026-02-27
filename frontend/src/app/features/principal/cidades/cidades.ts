import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cidades',
  imports: [Button,CommonModule,FormsModule],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades {
  @Input()
  extraClass = '';

  @Output() opcaoSelecionada = new EventEmitter<string>();

  escolhida:string = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
}
