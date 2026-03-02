import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Veiculo } from '../../models/veiculos.model';
import { VeiculoCardComponent } from '../veiculo-card/veiculo-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, VeiculoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  private route = inject(ActivatedRoute);

  veiculos: Veiculo[] = this.route.snapshot.data['veiculos'];
}