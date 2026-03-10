import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../../../core/components/button/button";

@Component({
  selector: 'app-modal-results',
  imports: [Button],
  templateUrl: './modal-results.html',
  styleUrl: './modal-results.css',
})
export class ModalResults {

  @Input() title!:string;
  @Input() text!:string;
  @Input() img!:string;
  @Input() text_button!:string;
  @Output() valueChange = new EventEmitter<string>();
}
