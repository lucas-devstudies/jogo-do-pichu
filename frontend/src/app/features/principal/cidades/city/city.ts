import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city',
  imports: [],
  templateUrl: './city.html',
  styleUrl: './city.css',
})
export class City {
  @Input()
  img:string = '';
  
  @Input()
  city:string = '';
}
