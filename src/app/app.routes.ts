import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CatalogoComponent } from './features/catalogo/catalogo.component';
import { PerfilComponent } from './features/perfil/perfil.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }

]
