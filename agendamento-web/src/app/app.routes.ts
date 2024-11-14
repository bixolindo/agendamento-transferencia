import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';

// Definindo as rotas
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para o login por padrão
  { path: 'login', component: LoginComponent }, // Rota de login
  { path: 'home', component: HomeComponent }, // Rota para a página home
  { path: '**', redirectTo: '/login' } // Redireciona para login em caso de rota inválida
];