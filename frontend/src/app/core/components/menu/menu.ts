import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  @Input()
  select:'home' | 'account' | 'history' | 'gear' = 'home';

  constructor(private router:Router){}

  toConfig(){
    this.router.navigate(['config']);
  }
  toHome(){
    this.router.navigate(['principal']);
  }
  toAccount(){
    this.router.navigate(['account']);
  }
  toHistory(){
    this.router.navigate(['history']);
  }
}
