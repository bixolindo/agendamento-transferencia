import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { authGuard } from './guard/auth.guard';

// Definindo as rotas
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, 
  { path: '**', redirectTo: '/login' } 
];