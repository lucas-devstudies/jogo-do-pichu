import { Component, EventEmitter, Output } from '@angular/core';
import { BackButton } from "../../../shared/components/back-button/back-button";

@Component({
  selector: 'app-about',
  imports: [BackButton],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  @Output() voltar = new EventEmitter<string>();

  back(){
    this.voltar.emit("voltar");
  }
}
