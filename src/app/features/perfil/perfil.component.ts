import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/usuario.service';
import { VeiculoCardComponent } from '../veiculo-card/veiculo-card.component';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, VeiculoCardComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  constructor(
    public userService: UserService,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe();
  }
  
  usuario = computed(() => this.userService.usuarioLogado());

  reservas() {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  veiculosReservados = computed(() => {
    const user = this.usuario();
    if (!user) return [];

    const reservas = this.reservas()
      .filter((r: { userId: number; }) => r.userId === user.id)
      .map((r: { veiculoId: number; }) => r.veiculoId);

    console.log(this.veiculoService.getVeiculosSnapshot());

    return this.veiculoService.getVeiculosSnapshot()
      .filter(v => reservas.includes(v.id));
  });
}