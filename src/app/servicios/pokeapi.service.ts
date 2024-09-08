import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  urlApi = 'https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) { }

  obtenerListadoPokemones(url?: string | undefined){
    return this.http.get(this.urlApi) //devuelve in observable
  }

  obtenerUnPokemon(url:string){
    return this.http.get(url);
  }

  nextPage(nextPageUrl:string){
    return this.http.get(nextPageUrl);
  }

  prevPage(prevPageUrl:string){
    return this.http.get(prevPageUrl);

  }


}

