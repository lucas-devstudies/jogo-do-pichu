import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { Bet } from '../../shared/models/Bet';
import { Menu } from "../../core/components/menu/menu";
import { PokeapiService } from '../../core/services/pokeapi-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { City } from "../principal/cidades/city/city";
import { PokemonCard } from "../principal/pokemons/pokemon-card/pokemon-card";

@Component({
  selector: 'app-history',
  imports: [Menu, CommonModule, City, PokemonCard],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements AfterViewInit{

  private pokeAPIService = inject(PokeapiService);
  bets$ = this.pokeAPIService.findMyBets();

  getImage(bet: Bet, number:number): string {
    return this.pokeAPIService.getBetImageUrl(bet.typeBet,number);
  }
  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.scrollContainers.changes.subscribe(() => {
      this.configurarScroll();
    });
  
    if (this.scrollContainers.length > 0) {
      this.configurarScroll();
    }
  }
  configurarScroll() {
  this.scrollContainers.forEach((containerRef: ElementRef) => {
    const container = containerRef.nativeElement;

    // Trava para não duplicar eventos em re-renderizações
    if (container.getAttribute('data-scroll-active')) return;
    container.setAttribute('data-scroll-active', 'true');

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      
      // Impede o navegador de tentar "arrastar" a imagem ou selecionar texto
      e.preventDefault(); 
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      
      e.preventDefault(); 
      
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX; 
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('dragstart', (e: Event) => e.preventDefault());
  });
  }
}
