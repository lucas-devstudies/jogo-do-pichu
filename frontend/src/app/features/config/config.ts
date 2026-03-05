import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { TokenService } from '../../core/services/token-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [Menu],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {

  constructor(private tokenService:TokenService,private router:Router){}

  logout(){
    this.tokenService.logout();
    this.router.navigate(['principal']);
  }
}
