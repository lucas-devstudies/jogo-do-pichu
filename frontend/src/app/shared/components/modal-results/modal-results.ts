import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-results',
  imports: [Button,CommonModule],
  templateUrl: './modal-results.html',
  styleUrl: './modal-results.css',
})
export class ModalResults{

  @Input() title!:string;
  @Input() textBet:string = "";
  @Input() textReceived:string = "";
  @Input() img!:string;
  @Input() text_button!:string;
  @Input() backed!: boolean;
  @Output() selected = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  clickButton(){
    this.selected.emit(true);
  }
  clickBack(){
    this.closed.emit(true)
  }
}
