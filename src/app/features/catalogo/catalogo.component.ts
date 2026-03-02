import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { EstoqueService } from '../../services/estoque.service';
import { Veiculo } from '../../models/veiculos.model';
import { VeiculoCardComponent } from '../veiculo-card/veiculo-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, VeiculoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {

  private estoqueService = inject(EstoqueService);

  // Converte Observable para Signal
  veiculos = toSignal(
    this.estoqueService.getEstoque(),
    { initialValue: [] as Veiculo[] }
  );
  reservar(veiculo: Veiculo) {
    alert(`Veículo ${veiculo.modelo} reservado!`);
  }
}