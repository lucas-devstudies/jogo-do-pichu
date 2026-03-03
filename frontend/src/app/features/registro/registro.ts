import { Component } from '@angular/core';
import { Button } from "../../core/components/button/button";
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { CustomInput } from "../../shared/components/custom-input/custom-input";

@Component({
  selector: 'app-registro',
  imports: [Button, CustomInput],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  name: string = "";
  email: string = "";
  balance: BigInt = 0n;
  cpf: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private user:UserService
  ){}

  confirmar(event:Event) {
    event.preventDefault();
    const custom: User = {
        name: this.name,
        balance: this.balance,
        email: this.email,
        password: this.password
      };

      this.user.add(custom).subscribe({
        next: (dados) => {
          alert(`Usuário ${dados.name} cadastrado!`);
          this.router.navigate(['home'])
          
        },
        error: (err) => {
          console.log("Erro ao cadastrar:", err);
        }
    });
  }
  reverse(){
    this.router.navigate(['login'])
  }
}
