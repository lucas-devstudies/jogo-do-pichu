import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-options',
  imports: [Button,CommonModule,FormsModule],
  templateUrl: './options.html',
  styleUrl: './options.css',
})
export class Options {
  @Input()
  extraClass = '';

  @Output() opcaoSelecionada = new EventEmitter<string>();

  escolhida:'region'|'pokemon' = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
}

