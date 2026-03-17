import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, of } from 'rxjs';

interface Region {
  id:number;
  name: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {

  private urlImage = '/assets/cities';
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

  getNumberPokemon(): Observable<number> {
    return this.http.get<{ count: number }>(this.baseUrl)
      .pipe(map(res => res.count));
  }
  getRegioes(): Observable<Region[]> {
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
}