import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseURL: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }

  getHeroeById( id: string): Observable< Hero | undefined>{
    return this.http.get<Hero>(`${this.baseURL}/heroes/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }


}
