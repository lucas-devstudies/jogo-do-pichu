import { Component } from '@angular/core';
import { Menu } from "../../core/components/menu/menu";
import { Bet } from '../../shared/models/Bet';

@Component({
  selector: 'app-account',
  imports: [Menu],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {

  eye:"open"|"close" = "open";

  historical: Bet[] = []

  changeState(){
    if(this.eye=="open"){
      this.eye="close";
    }else{
      this.eye="open"
    }
  }
}
