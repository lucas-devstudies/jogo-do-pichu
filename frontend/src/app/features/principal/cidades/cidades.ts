import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { City } from "../../../core/components/city/city";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { Router } from '@angular/router';
import { BackButton } from "../../../shared/components/back-button/back-button";
import { ModalResults } from "../../../shared/components/modal-results/modal-results";

@Component({
  selector: 'app-cidades',
  imports: [Button, CommonModule, FormsModule, City, CustomInput, BackButton, ModalResults],
  templateUrl: './cidades.html',
  styleUrl: './cidades.css',
})
export class Cidades implements AfterViewInit {

  card:string = "";
  value:number = 0;

  private pokeAPIService = inject(PokeapiService);

  regions$ = this.pokeAPIService.getRegioes();
  results:'confirm' | 'win' | 'result' | 'lose' | 'none' = 'none';

  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;
  @Output() voltar = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.configurarScroll(); 
    this.scrollContainers.changes.subscribe(() => {
      this.configurarScroll();
    });
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
  })}
  next(){
    this.results='result';
  }

  change(){
    this.results='confirm';
  }
  
  back(){
    this.voltar.emit("voltar");
  }
  formatedValue(value:number){
    return value*180;
  }
  showResult(){
    this.results='lose';
  }
  closeModal(){
    this.back();
  }
}
