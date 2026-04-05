import { Component, inject } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Bet } from '../../shared/models/Bet';
import { UserService } from '../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { formatCurrency } from '../../core/utils/formated-big-int';
import { map } from 'rxjs';

@Component({
  selector: 'app-account',
  imports: [Menu,CommonModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {

  eye:"open"|"close" = "open";

  fc = formatCurrency;
  userService = inject(UserService);
  me$ = this.userService.me();
    balance$ = this.me$.pipe(map(user => user?.balance ?? 0n)
  );

  historical: Bet[] = []

  changeState(){
    if(this.eye=="open"){
      this.eye="close";
    }else{
      this.eye="open"
    }
  }
}
