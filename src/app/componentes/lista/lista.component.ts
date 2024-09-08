import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { PokeapiService } from '../../servicios/pokeapi.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


// Interfaces para la estructura de datos
interface Ability {
  ability: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: Ability[];
  cries: {
    latest: string;
  };
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule,MatButtonModule, MatCardModule],
  providers:[PokeapiService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})

export class ListaComponent implements OnInit{
  [x: string]: any;
  listaPokemones: any;
  pokemonesCompleto:any[]=[];
  constructor(private pokeApi:PokeapiService){  }

  ngOnInit(): void {
    this.pokeApi.obtenerListadoPokemones().subscribe({
      next:(data:any)=>{
        this.listaPokemones = data
        this.listaPokemones.results.forEach((element:any)=> {
          this.pokeApi.obtenerUnPokemon(element.url).subscribe({
            next:(data:any)=> {
             this.pokemonesCompleto.push(data)

             this['cdr'].detectChanges(); // Forzar la actualización de la vista
            },
          })
        });
        console.log(this.listaPokemones);
        console.log(this.pokemonesCompleto);
      },
      error :(err:any)=>{console.log(err);
      (Error)}
    })
  }
  nextPage(nextPageUrl:string):void {}
  

  playSound(soundSource:string){
    const audio = new Audio ();
    audio.src = soundSource;
    audio.load();
    audio.play();
  }
 
}
