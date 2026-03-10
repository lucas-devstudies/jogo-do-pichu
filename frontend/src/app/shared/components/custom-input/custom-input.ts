import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomInputValue } from '../../types/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput {
  @Input()
  type: "name" | "email"  | "password" | "search" | "card" = "name";
  @Input()
  type_input: "text" | "password" | "email" | "number" = "text";
  @Input() customClass: string = '';
  
  @Input()
  placeholder!:string
  
  @Input()
  value:CustomInputValue | null = null;

  @Output() valueChange = new EventEmitter<CustomInputValue>();
  
  onInputChange(event:any){
    let value:CustomInputValue;

    if (this.type_input === 'number') {
      value = Number(event.target.value);
    } else{
      value = event.target.value;
    }
    this.valueChange.emit(value);
  }
  blockKeyboard(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

}