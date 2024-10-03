import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { authService } from '../services/auth.service';

// Aqui lo que haremos sera controlar las autenticaciones y controlar
// que y lo que no puede ver un usuario logeado o no

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: authService,
    private router: Router
  ) { }

  // funcion que sirve para controlar las rutas controladas y devuelven una redireccion si no se esta logeado
  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
      .pipe(
        // este primer tab es para verificar que si esta logeado o no
        tap( isAuthenticated => console.log('Authenticated:',isAuthenticated)),
        tap( isAuthenticated => {
          if( isAuthenticated ){
                this.router.navigate(['./']);
          }
        }),
        // controlar un error de que cuando esto funciona no deja regresar al login
        map( isAuthenticated => !isAuthenticated),
      );

  }
// son funciones que sirven para declarar los gaurds y los que se usaran para definir los autenticadores
  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    // console.log('Can Match');
    // console.log( { route, segments});
    return this.checkAuthStatus();
  }
// son funciones que sirven para declarar los gaurds y los que se usaran para definir los autenticadores
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('Can Activate');
    // console.log( { route, state});
    return this.checkAuthStatus();
  }

}
