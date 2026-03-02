import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../models/veiculos.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private apiUrl = 'assets/estoque.json';

  private veiculosSignal = signal<Veiculo[]>([]);

  constructor(private http: HttpClient) {
  }

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl).pipe(
      tap(veiculos => this.veiculosSignal.set(veiculos))
    );
  }

  getVeiculosSnapshot(): Veiculo[] {
    return this.veiculosSignal();
  }

  getVeiculoPorId(id: number): Veiculo | undefined {
    return this.veiculosSignal().find(v => v.id === id);
  }
}