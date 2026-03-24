import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-results',
  imports: [Button,CommonModule],
  templateUrl: './modal-results.html',
  styleUrl: './modal-results.css',
})
export class ModalResults implements OnInit{

  @Input() title!:string;
  @Input() textBet:string = "";
  @Input() textReceived:string = "";
  @Input() img!:string;
  @Input() text_button!:string;
  @Input() backed!: boolean;
  @Output() selected = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();
  
  imgAlt:boolean = false;

  clickButton(){
    this.selected.emit(true);
  }
  clickBack(){
    this.closed.emit(true)
  }
  ngOnInit(){
    if(this.title=='Aposta Realizada!'){
      this.imgAlt=true;
    }
  }
}
