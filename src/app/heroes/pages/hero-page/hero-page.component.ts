import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})

// llamar por ruta individual a heroe
export class HeroPageComponent implements OnInit {

  // HACEMOS ESTA DECLARACION NULA HASTA QUE SE CUMPLA LA CONDICION
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ){}

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }

  ngOnInit(): void {
    //leer la ruta
    this.activateRoute.params
      .pipe(
        // switchMap, toma los params pero de esos params desestructura y tomamos el id
        // delay(3000),
        switchMap( ({id}) => this.heroesService.getHeroeById(id) ),
      ).subscribe( hero => {

        //Si no existe un hero aplicamos esto
        if( !hero ) return this.router.navigate([ '/heroes/list' ]);

        // pero si existe aplicamos esto

        this.hero = hero;

        console.log("AQUI INFORMACION DEL HEROE", hero);
        return;


      });

  }

}
