import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, of } from 'rxjs';
import { Bet, BetDTO } from '../../shared/models/Bet';
import { TokenService } from './token-service';
import { Pokemons } from '../../features/principal/pokemons/pokemons';

interface Region {
  id:number;
  name: string;
  img: string;
}

interface Pokemon{
  id:number;
  name:string;
  img:string;
}


@Injectable({
  providedIn: 'root',
})
export class PokeapiService {

  private urlImage = '/assets/cities';
  private urlBase = 'http://localhost:8080';
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  constructor(private token:TokenService,private http:HttpClient){}

  getPokemons(limit = 20, offset = 0) {
    return this.http
      .get<any>(`${this.baseUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map(res =>
          res.results.map((p: any) => {
            const id = Number(p.url.split('/').slice(-2, -1)[0]);
            return {
              id,
              name: p.name,
              img: `${this.imageUrl}/${id}.png`
            };
          })
        )
      );
  }

  getNumberPokemon(): number{
    return 1025;
  }

  postBet(bet:BetDTO): Observable<Bet> {
    const headers = this.token.getAuthHeaders();
    return this.http.post<Bet>(`${this.urlBase}/bet/save`,bet,{headers});
  }

  findPokemon(id:number):Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        // Aqui a gente "molda" o objeto que o componente vai receber
        const pokemon: Pokemon = {
          id: res.id,
          name: res.name,
          // Pegando a imagem oficial direto do nó complexo da PokeAPI
          img: `${this.imageUrl}/${id}.png`
        };
        return pokemon;
      })
    );
  }
  
  findRegion(id:number):Observable<Region>{
    return this.getRegions().pipe(
    map(regions => regions.find(r => r.id === id)!)
  );
  }
  
  getRegions(): Observable<Region[]> {
    const region: Region[] = [
      {id:1, name: 'Alola', img: `${this.urlImage}/Alola.png` },
      {id:2, name: 'Galar', img: `${this.urlImage}/Galar.png` },
      {id:3, name: 'Hisui', img: `${this.urlImage}/Hisui.png` },
      {id:4, name: 'Hoenn', img: `${this.urlImage}/Hoenn.png` },
      {id:5, name: 'Johto', img: `${this.urlImage}/Johto.png` },
      {id:6, name: 'Kalos', img: `${this.urlImage}/Kalos.png` },
      {id:7, name: 'Kanto', img: `${this.urlImage}/Kanto.png` },
      {id: 8, name: 'Paldea', img: `${this.urlImage}/Paldea.png` },
      {id:9, name: 'Sinnoh', img: `${this.urlImage}/Sinnoh.png` },
      {id:10, name: 'Unova', img: `${this.urlImage}/Unova.png` },
    ];

    return of(region);
  }

  getNumberRegions():number{
    return 10;
  }

  findMyBets():Observable<Bet[]>{
    const headers = this.token.getAuthHeaders();
    return this.http.get<Bet[]>(`${this.urlBase}/bet/findMyBets`,{headers});
  }

  getBetImageUrl(typeBet: string, result: number): string {
    if (typeBet === 'POKEMON') {
      return `${this.imageUrl}/${result}.png`;
    }
    if (typeBet === 'REGION') {
    const regions = [
      'Alola', 'Galar', 'Hisui', 'Hoenn', 'Johto', 
      'Kalos', 'Kanto', 'Paldea', 'Sinnoh', 'Unova'
    ];
    const regionName = regions[result - 1] || 'Kanto'; 
    return `${this.urlImage}/${regionName}.png`;
  }

  return 'assets/icons/not-found.png'; // Fallback
}
}