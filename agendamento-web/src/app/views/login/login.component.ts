import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../model/usuario';
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  toastMessage: string = '';
  toastType: string = 'success';
  isToastVisible: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    if (this.username && this.password) {
      const body: Usuario = {
        nome: this.username,
        senha: this.password
      }

      this.loginService.login(body).subscribe({
        next: (response) => {
          if (response) {
            this.loginService.setToken(response.token);
            this.loginService.setUsuario(response.nome);
            this.router.navigate(['/home']);
          } else {
            this.showToast('Usuário ou senha inválidos.', 'danger');
          }
        },
        error: (err) => {
          this.showToast(err.error, 'danger');
        }
      });
    } else {
      this.showToast('Preencha todos os campos.', 'warning');
    }
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    this.isToastVisible = true;

    setTimeout(() => {
      this.isToastVisible = false;
    }, 3000);
  }
}
