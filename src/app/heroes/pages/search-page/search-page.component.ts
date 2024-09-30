import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/hero.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor( private heroeService: HeroesService){}

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.heroeService.getSuggestion( value )
      .subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void{

    //Condicional si la opcion seleccionada tiene  o no elelemntos
    if( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    // si los tiene entonces
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)

    this.selectedHero = hero;


  }

}
