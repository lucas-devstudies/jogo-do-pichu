import { Component } from '@angular/core';
import { Bet } from '../../shared/models/Bet';
import { Menu } from "../../core/components/menu/menu";

@Component({
  selector: 'app-history',
  imports: [Menu],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {

  historical: Bet[] = []
}

