import { Component, EventEmitter, Output } from '@angular/core';
import { BackButton } from "../../../shared/components/back-button/back-button";

@Component({
  selector: 'app-sobre',
  imports: [BackButton],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {

  @Output() voltar = new EventEmitter<string>();

  back(){
    this.voltar.emit("voltar");
  }
}
