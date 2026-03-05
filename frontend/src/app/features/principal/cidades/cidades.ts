import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { City } from "../../../core/components/city/city";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cidades',
  imports: [Button, CommonModule, FormsModule, City, CustomInput],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades implements AfterViewInit {
  @Input()
  extraClass = '';

  card:string = "";
  valor:BigInt = 0n;

  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
  this.configurarScroll(); 
  this.scrollContainers.changes.subscribe(() => {
    this.configurarScroll();
  });
}
  regions;
  constructor(private pokeapiService:PokeapiService,private router:Router){
    this.regions = pokeapiService.getRegioes();
  }
  
  @Output() opcaoSelecionada = new EventEmitter<string>();
  @Output() voltar = new EventEmitter<string>();

  escolhida:string = 'pokemon';

  change(){
    this.opcaoSelecionada.emit(this.escolhida);
  }
  configurarScroll(){
    this.scrollContainers.forEach((containerRef: ElementRef) => {
    const container = containerRef.nativeElement;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
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
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    });
  });
  }
  back(){
    this.voltar.emit("voltar");
  }
}
