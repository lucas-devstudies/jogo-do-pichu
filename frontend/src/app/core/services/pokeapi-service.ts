import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

interface Region {
  name: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  constructor(private http: HttpClient) {}

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

  getNumberPokemon():Observable<number>{
    return this.http.get<{count: number}>(`${this.baseUrl}`)
    .pipe(map(res=>res.count));
  }

  getRegioes(): Region[] {
    const regions: Region[] = [
      { name: 'Alola', img: `${this.baseUrl}/Alola.png` },
      { name: 'Galar', img: `${this.baseUrl}/Galar.png` },
      { name: 'Hisui', img: `${this.baseUrl}/Hisui.png` },
      { name: 'Hoenn', img: `${this.baseUrl}/Hoenn.png` },
      { name: 'Johto', img: `${this.baseUrl}/Johto.png` },
      { name: 'Kalos', img: `${this.baseUrl}/Kalos.png` },
      { name: 'Kanto', img: `${this.baseUrl}/Kanto.png` },
      { name: 'Paldea', img: `${this.baseUrl}/Paldea.png` },
      { name: 'Sinnoh', img: `${this.baseUrl}/Sinnoh.png` },
      { name: 'Unova', img: `${this.baseUrl}/Unova.png` },
    ];

    return regions;
  }
}