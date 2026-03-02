// só entra na rota catálogo quem está logado

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/usuario.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(): boolean {
        const loggedUser = this.userService.getLoggedUser();
        if (loggedUser) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}