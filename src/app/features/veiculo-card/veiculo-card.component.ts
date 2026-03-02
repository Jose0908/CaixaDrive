import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo } from '../../models/veiculos.model';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-veiculo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veiculo-card.component.html',
  styleUrl: './veiculo-card.component.scss'
})
export class VeiculoCardComponent {

  veiculo = input.required<Veiculo>();

  constructor(private userService: UserService) {}

  usuarioLogado() {
    return this.userService.usuarioLogado();
  }

  reservas(): any[] {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  jaReservado(): boolean {
    const user = this.usuarioLogado();
    if (!user) return false;

    return this.reservas().some(r =>
      r.userId === user.id && r.veiculoId === this.veiculo().id
    );
  }

  reservarVeiculo() {
    const user = this.usuarioLogado();
    if (!user) return;

    let reservas = this.reservas();

    if (this.jaReservado()) {
      // REMOVER
      reservas = reservas.filter(r =>
        !(r.userId === user.id && r.veiculoId === this.veiculo().id)
      );
    } else {
      // ADICIONAR
      reservas.push({
        userId: user.id,
        veiculoId: this.veiculo().id
      });
    }

    localStorage.setItem('reservas', JSON.stringify(reservas));
  }
}