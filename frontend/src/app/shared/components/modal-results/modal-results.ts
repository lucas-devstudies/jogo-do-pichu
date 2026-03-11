import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Button } from "../../../core/components/button/button";

@Component({
  selector: 'app-modal-results',
  imports: [Button],
  templateUrl: './modal-results.html',
  styleUrl: './modal-results.css',
})
export class ModalResults{

  @Input() title!:string;
  @Input() textBet:string = "";
  @Input() textReceived:string = "";
  @Input() img!:string;
  @Input() text_button!:string;
  @Output() selected = new EventEmitter<boolean>();

  clickButton(){
    this.selected.emit(true);
  }
}
