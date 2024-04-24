import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private getEndpoint: string = this.baseUrl + '/users';
  private user?: User;

  constructor(private http: HttpClient) { }

  public get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      );
  }
  
  public logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

  public checkAuthStatus(): Observable<boolean>{
    
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(this.getEndpoint + '/1')
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(error => of(false))
      );
  }
}
