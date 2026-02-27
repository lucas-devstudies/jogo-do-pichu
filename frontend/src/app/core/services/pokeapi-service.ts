import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
    
    url = '/assets/cities';

    regions = [
      {name:'Alola',img:`${this.url}/Alola.png`},
      {name:'Galar',img:`${this.url}/Galar.png`},
      {name:'Hisui',img:`${this.url}/Hisui.png`},
      {name:'Hoenn',img:`${this.url}/Hoenn.png`},
      {name:'Johto',img:`${this.url}/Johto.png`},
      {name:'Kalos',img:`${this.url}/Kalos.png`},
      {name:'Kanto',img:`${this.url}/Kanto.png`},
      {name:'Paldea',img:`${this.url}/Paldea.png`},
      {name:'Sinnoh',img:`${this.url}/Sinnoh.png`},
      {name:'Unova',img:`${this.url}/Unova.png`},
    ]
}
