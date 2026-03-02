import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    public userService: UserService, 
    private router: Router
  ) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}