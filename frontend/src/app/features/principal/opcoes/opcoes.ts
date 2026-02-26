import { Component, EventEmitter, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opcoes',
  imports: [Button,FormsModule],
  templateUrl: './opcoes.html',
  styleUrl: './opcoes.css',
})
export class Opcoes {
  @Output() opcaoSelecionada = new EventEmitter<string>();

  escolhida:string = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
}
