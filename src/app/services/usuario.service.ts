import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'assets/usuarios.json';

  usuarioLogado = signal<Usuario | null>(this.getLoggedUser());

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  login(username: string, password: string): Observable<Usuario | null> {
    return new Observable(observer => {
      this.getUsers().subscribe(users => {
        const user = users.find(
          u => u.username === username && u.password === password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('loggedUser', JSON.stringify(userWithoutPassword));

          this.usuarioLogado.set(userWithoutPassword as Usuario);
        }

        observer.next(user || null);
        observer.complete();
      });
    });
  }

  logout(): void {
    localStorage.removeItem('loggedUser');

    this.usuarioLogado.set(null);
  }

  getLoggedUser(): Usuario | null {
    const userJson = localStorage.getItem('loggedUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}