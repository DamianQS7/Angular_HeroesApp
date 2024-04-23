import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;
  private getEndpoint: string = `${this.baseUrl}/heroes`;


  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.getEndpoint);
  }

  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.getEndpoint}/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }

  public getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.getEndpoint}?q=${query}&_limit=6`);
  }

  public addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(this.getEndpoint, hero);
  }

  public partialUpdateHero( hero: Hero ): Observable<Hero> {
    if( !hero.id) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${this.getEndpoint}/${hero.id}`, hero);
  }

  public deleteHero( id: string ): Observable<boolean> {
    return this.http.delete(`${this.getEndpoint}/${id}`)
        .pipe(
          catchError( error => of(false)),
          map( response => true)
        );
  }
}
