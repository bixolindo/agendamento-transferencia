import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiBaseUrl}/login`; // URL da API de login no backend

  constructor(private http: HttpClient) { }

  // Método para autenticar o usuário
  login(login : Usuario): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Fazendo a requisição POST para o backend
    return this.http.post<any>(this.apiUrl, login, { headers });
  }

  // Método para armazenar o token (se necessário)
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
