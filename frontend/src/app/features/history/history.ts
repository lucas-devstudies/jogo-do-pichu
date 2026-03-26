import { AfterViewInit, Component, ElementRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { Bet } from '../../shared/models/Bet';
import { Menu } from "../../core/components/menu/menu";
import { PokeapiService } from '../../core/services/pokeapi-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { City } from "../principal/cidades/city/city";
import { PokemonCard } from "../principal/pokemons/pokemon-card/pokemon-card";
import { Button } from "../../core/components/button/button";

@Component({
  selector: 'app-history',
  imports: [Menu, CommonModule, City, PokemonCard],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History implements AfterViewInit{

  // Criamos signals para o estado da tela
  bets = signal<Bet[]>([]);
  currentPage = signal<number>(0);
  isLastPage = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  
  private pokeAPIService = inject(PokeapiService);

  getImage(bet: Bet, number:number): string {
    return this.pokeAPIService.getBetImageUrl(bet.typeBet,number);
  }

  async ngOnInit() {
    await this.loadBets(0);
  }

  async loadBets(page: number) {
    if (this.isLoading()) return; // Trava para não clicar mil vezes
    
    this.isLoading.set(true);
    try {
      const res = await this.pokeAPIService.findMyBets(page);
      
      // Atualizamos os signals
      this.bets.set(res.content);
      this.currentPage.set(res.number);
      this.isLastPage.set(res.last);
      
      // Se precisar resetar o scroll, chama aqui
      setTimeout(() => this.configurarScroll(), 50);
    } catch (error) {
      console.error('Erro ao buscar apostas:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async nextPage() {
    if (!this.isLastPage()) {
      await this.loadBets(this.currentPage() + 1);
    }
  }

  async prevPage() {
    if (this.currentPage() > 0) {
      await this.loadBets(this.currentPage() - 1);
    }
  }


  //configuração de Scrool
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
