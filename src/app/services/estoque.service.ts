import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculos.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private apiUrl = 'assets/estoque.json';

  constructor(private http: HttpClient) {}

  getEstoque(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }
}
