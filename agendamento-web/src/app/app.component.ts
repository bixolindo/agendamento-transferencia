import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule


@Component({
  selector: 'app-root',
  standalone: true,  // Marca o componente como standalone
  imports: [
    RouterModule,
    FormsModule,
    HomeComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-angular-app';
}