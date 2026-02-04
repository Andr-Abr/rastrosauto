import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vehiculo {
  idVehiculos: number;
  marca: string;
  modelo: string;
  anio: number;
  generacion: string;
  motor: string;
  tipoCombustible: string;
  consumoKmL: number;
  tipoTraccion: string;
  tipoCarroceria: string;
  numeroPlazas: string;
  rutaImagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = '/vehiculos';

  constructor(private http: HttpClient) {
    console.log('✅ VehiculoService inicializado');
  }

  buscarSugerencias(query: string): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/buscar-sugerencias?query=${query}`);
  }

  obtenerVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/${id}`);
  }
}