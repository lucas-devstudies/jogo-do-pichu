import { Component } from '@angular/core';
import { BackButton } from "../../shared/components/back-button/back-button";
import { Menu } from "../../core/components/menu/menu";
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [BackButton, Menu],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  constructor(private router:Router){}

  login(){
    this.router.navigate(['login']);
  }
}
