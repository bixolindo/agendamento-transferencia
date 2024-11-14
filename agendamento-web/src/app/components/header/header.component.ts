import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../views/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  usuario: string | null = 'visitante';

  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
    this.usuario = localStorage.getItem('user');
  }


  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  navegarExtrato() {
    this.router.navigate(['/extrato']);
  }

  navegarHome() {
    this.router.navigate(['/home']);
  }
}
