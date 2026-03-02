import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo } from '../../models/veiculos.model';

@Component({
  selector: 'app-veiculo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './veiculo-card.component.html',
  styleUrl: './veiculo-card.component.scss'
})
export class VeiculoCardComponent {

  // Input com signal
  veiculo = input.required<Veiculo>();

  // Output com signal
  reservar = output<Veiculo>();

  reservarVeiculo() {
    this.reservar.emit(this.veiculo());
  }
}