import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { TokenService } from '../../core/services/token-service';
import { Router } from '@angular/router';
import { Sobre } from './sobre/sobre';

@Component({
  selector: 'app-config',
  imports: [Menu,Sobre],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {

  constructor(private tokenService:TokenService,private router:Router){}

  pagina:"sobre"| "config"= "config";

  logout(){
    this.tokenService.logout();
    this.router.navigate(['principal']);
  }
  toConfig(){
    this.pagina="sobre";
  }
}
