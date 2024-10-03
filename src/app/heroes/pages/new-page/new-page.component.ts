import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from '../../components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  // definicion de valores para el formulario
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroeService: HeroesService,

    // ActivatedRoute Proporciona acceso a información
    // sobre una ruta asociada con un componente
    // que está cargado en una salida. Utilícelo
    // para recorrer el árbol RouterState y extraer
    // información de los nodos.
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snakbar: MatSnackBar,
    private dialog: MatDialog,

  ) { }


  // definir los valores antes de enviarlos al servicio
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  ngOnInit(): void {

    // si la ruta de direccion no tiene el edit entonces no hara nada
    if (!this.router.url.includes('edit')) return;

    // si fuese lo contrario hay que obtener su data
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      ).subscribe(hero => {

        // si el heroe no existe entonces lo enviaremos a otro lugar
        if (!hero) return this.router.navigateByUrl('/');

        // hacemos que reset devuelva los valores
        // segun lo que contenga hero en vez de otros
        // terminos como vacio
        this.heroForm.reset(hero);
        return;
      });

  }


  onSubmit(): void {

    // validar si el servicio es correcto
    if (this.heroForm.invalid) return;

    // si existe el id se procedera a editar y a terminar el proceso
    if (this.currentHero.id) {
      this.heroeService.updateHero(this.currentHero)
        .subscribe(hero => {
          // mostrar snakbar
          this.showSnakbar(`${hero.superhero} updated`);
        })
      return;
    }

    // si no existe el id se creara uno nuevo desde cero

    this.heroeService.addHero(this.currentHero)
      .subscribe(hero => {
        // mostrar snakbar y navegar a heroes/edit/ hero.id
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnakbar(`${hero.superhero} created`);
      })


    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    // })
  }

  onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmdialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroeService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result ) return;

    //   this.heroesService.deleteHeroById( this.currentHero.id )
    //   .subscribe( wasDeleted => {
    //     if ( wasDeleted )
    //       this.router.navigate(['/heroes']);
    //   })
    // });

  }

  showSnakbar(message: string): void {
    this.snakbar.open(message, 'done', {
      duration: 2500,
    })
  }



}
