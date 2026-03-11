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
  getRegioes(): Region[] {
    const regions: Region[] = [
      { name: 'Alola', img: `${this.urlImage}/Alola.png` },
      { name: 'Galar', img: `${this.urlImage}/Galar.png` },
      { name: 'Hisui', img: `${this.urlImage}/Hisui.png` },
      { name: 'Hoenn', img: `${this.urlImage}/Hoenn.png` },
      { name: 'Johto', img: `${this.urlImage}/Johto.png` },
      { name: 'Kalos', img: `${this.urlImage}/Kalos.png` },
      { name: 'Kanto', img: `${this.urlImage}/Kanto.png` },
      { name: 'Paldea', img: `${this.urlImage}/Paldea.png` },
      { name: 'Sinnoh', img: `${this.urlImage}/Sinnoh.png` },
      { name: 'Unova', img: `${this.urlImage}/Unova.png` },
    ];

    return regions;
  }
}