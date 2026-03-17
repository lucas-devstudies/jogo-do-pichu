import { Component } from '@angular/core';
import { Button } from "../../core/components/button/button";
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { CustomInput } from "../../shared/components/custom-input/custom-input";

interface RegisterDTO {
  name:string;
  email:string;
  password:string;
  theme:string;
}

@Component({
  selector: 'app-registro',
  imports: [Button, CustomInput],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})

export class Registro {
  
  registerDTO:RegisterDTO = {
    name:'',
    email:'',
    password:'',
    theme:'Dark'
  } 

  constructor(
    private router: Router,
    private user:UserService
  ){}

  confirmar(event:Event) {
    event.preventDefault();
      this.user.add(this.registerDTO.name,this.registerDTO.email,this.registerDTO.password,this.registerDTO.theme).subscribe({
        next: (dados) => {
          alert(`Usuário ${dados.name} cadastrado!`);
          this.router.navigate(['principal'])
          
        },
        error: (err) => {
          console.log(err);
        }
    });
  }
  reverse(){
    this.router.navigate(['entrar'])
  }
}
