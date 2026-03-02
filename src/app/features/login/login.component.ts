import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  formStatus = signal<string>('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

    const loggedUser = this.userService.getLoggedUser();
    if (loggedUser) {
      this.redirectToHomePage();
    }
  }

  redirectToHomePage() {
    this.router.navigate(['/catalogo']);
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (username && password) {
      this.userService.login(username, password).subscribe(user => {
        if (user) {
          this.formStatus.set('Login bem-sucedido!');
          this.redirectToHomePage();
        } else {
          this.formStatus.set('Credenciais inválidas. Tente novamente.');
        }
      });
    }
    else {
      this.formStatus.set('Por favor, preencha o formulário corretamente.');
    }
  }
}