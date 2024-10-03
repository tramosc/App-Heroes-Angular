import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class authService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  // controlamos es acceso de los usuario si existen o no

  get currentUser():User|undefined{

    // si no existe el usuario devolvera undefined
    if( !this.user ) return undefined;

    // pero si existe
    return structuredClone(this.user);
  }


  // preparar una funcion para el login
  login( email: string, password: string ): Observable<User>{

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', user.id.toString() )),
      );
  }

  checkAuthentication(): Observable<boolean> {

    if( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( err => of(false))
      );


  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

}
