import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Veiculo } from '../models/veiculos.model';
import { VeiculoService } from '../services/veiculo.service';

export const consorcioResolver: ResolveFn<Veiculo[]> = () => {
  const veiculoService = inject(VeiculoService);
  return veiculoService.getVeiculos();
};