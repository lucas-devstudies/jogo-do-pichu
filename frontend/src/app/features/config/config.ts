import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { TokenService } from '../../core/services/token-service';
import { Router } from '@angular/router';
import { About } from "./about/about";

@Component({
  selector: 'app-config',
  imports: [Menu, About, About],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {

  constructor(private tokenService:TokenService,private router:Router){}

  pagina:"about"| "config"= "config";

  logout(){
    this.tokenService.logout();
    this.router.navigate(['principal']);
  }
  toConfig(){
    this.pagina="about";
  }
  back(){
    this.pagina="config";
  }
}
