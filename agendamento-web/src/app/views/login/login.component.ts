import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage : string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    if (this.username && this.password) {
      const body : Usuario = {
        nome: this.username,
        senha: this.password
      }

      this.loginService.login(body).subscribe({
        next: (response) => {
          console.log(response);
          this.loginService.setToken(response.token);
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Usuário ou senha inválidos';
        }
      });
    } else {
      this.errorMessage = 'Preencha todos os campos.';
    }
  }
}
