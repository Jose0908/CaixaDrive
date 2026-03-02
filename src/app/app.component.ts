import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isUsuarioLogado = signal(false);
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.isUsuarioLogado.set(!!userService.getLoggedUser());
  }

  logout() {
    this.userService.logout();
    this.isUsuarioLogado.set(false);
  }
}
