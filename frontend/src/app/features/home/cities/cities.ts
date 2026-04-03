import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Button } from "../../../core/components/button/button";
import { CommonModule } from '@angular/common';
import { City } from './city/city';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from '../../../core/services/pokeapi-service';
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { BackButton } from "../../../shared/components/back-button/back-button";
import { ModalResults } from "../../../shared/components/modal-results/modal-results";
import { Bet, BetDTO, NumBet } from '../../../shared/models/Bet';
import { TypeBet } from '../../../shared/models/TypeBet';
import { UserDTO } from '../../../shared/models/UserDTO';
declare var bootstrap: any;

interface Region{
  id:number;
  name:string;
  img:string;
}

@Component({
  selector: 'app-cities',
  imports: [Button, CommonModule, FormsModule, City, CustomInput, BackButton, ModalResults],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities implements AfterViewInit{

  @Input()
  userDTO!:UserDTO;

  constructor(private cdr: ChangeDetectorRef){}

  private pokeAPIService = inject(PokeapiService);

  messageToast:string = "";

  bet:Bet = new Bet();
  betDTO:BetDTO = {
    balance:0,
    listNumber:[],
    typeBet:'REGION'
  };
  sortRegion: Region = {
    id:0,
    name:"",
    img:""
  }
  regions$ = this.pokeAPIService.getRegions();
  regionsNumber$ = this.pokeAPIService.getNumberRegions();
  results: 'confirm' | 'win' | 'lose' | 'result'| 'none' | 'drawn' = 'none';

  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;
  @Output() voltar = new EventEmitter<string>();

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
  next(){
    this.pokeAPIService.postBet(this.betDTO).subscribe({
      next:(bet)=>{
        this.bet = bet;
        console.log(bet);
        this.pokeAPIService.findRegion(this.bet.result).subscribe({
          next:(region)=>{
            this.sortRegion = region;
            this.results = 'drawn';
            this.cdr.detectChanges();
          },error:(err)=>{
            this.showToast("Resultado não encontrado");
          }
        })
      },error:(err)=> {
        this.showToast(err.error.message);
      },
    })
  }
  back(){
    this.voltar.emit("voltar");
  }
  formatedValue(value:number):number{
    return value*this.factor(this.betDTO);
  }
  openResult(){
    if(this.bet.value==0){
      this.results='lose';
    }else{
      this.results='win';
    }
  }
  showResult(){
    this.results='result';
  }
  closeModal(){
    this.back();
  }
  change(){
    this.results='confirm';
  }
  factor(betDTO:BetDTO):number{
    switch(betDTO.listNumber.length){
      case 1:
        return 7;
      
      case 2:
        return 3;
      
      default:
        return 7;
    }
  }
  showLimit(){
    this.showToast("Você atingiu o limite de seleções!");
  }
  togglerRegion(region: Region) {
    const config = TypeBet[this.betDTO.typeBet as keyof typeof TypeBet];    
    const index = this.betDTO.listNumber.findIndex(r => r.number === region.id);

    if (index !== -1) {
        this.betDTO.listNumber.splice(index, 1);
        
       this.betDTO.listNumber = [...this.betDTO.listNumber];
        
    } else {
        if (this.betDTO.listNumber.length < config.maxBet) {
            const nb: NumBet = {
                number: region.id,
                name:region.name
            };
            this.betDTO.listNumber.push(nb);
            this.betDTO.listNumber = [...this.betDTO.listNumber];
        } else {
            this.showToast(`Limite de ${config.maxBet} atingido!`);
        }
    }
  }
  get isMaxLimitExceeded(): boolean {
    const config = TypeBet[this.betDTO.typeBet as keyof typeof TypeBet];
    return this.betDTO.listNumber.length >= config.maxBet;
  }
  get formatedList(): string {
    const nomes = this.betDTO.listNumber
      .map(p => p.name) 
      .filter(n => !!n); 

    return nomes.length > 0 ? nomes.join(', ') : 'Nenhum selecionado';
  }
  closeConfModal(){
    this.results='none';
  }
  @ViewChild('liveToast', { static: true }) toastElement!: ElementRef;

  showToast(text: string) {
    this.messageToast = text;
    
    this.cdr.detectChanges();

    const toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);
    toastInstance.show();
  }
}