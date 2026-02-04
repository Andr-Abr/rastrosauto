import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = '/vehiculos';

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/marcas`);
  }

  getModelosPorMarca(marca: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/modelos-por-marca?marca=${marca}`);
  }

  getAniosPorFiltros(marca?: string, modelo?: string): Observable<number[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}`;
    return this.http.get<number[]>(`${this.apiUrl}/anios-por-filtros?${params}`);
  }

  getGeneracionesPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/generaciones-por-filtros?${params}`);
  }

  getMotoresPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/motores-por-filtros?${params}`);
  }

  getCombustiblesPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/combustibles-por-filtros?${params}`);
  }

  getTraccionesPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/tracciones-por-filtros?${params}`);
  }

  getCarroceriasPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/carrocerias-por-filtros?${params}`);
  }

  getPlazasPorFiltros(marca?: string, modelo?: string, anio?: number): Observable<string[]> {
    let params = '';
    if (marca) params += `marca=${marca}&`;
    if (modelo) params += `modelo=${modelo}&`;
    if (anio) params += `anio=${anio}`;
    return this.http.get<string[]>(`${this.apiUrl}/plazas-por-filtros?${params}`);
  }

  getRangoConsumo(): Observable<{min: number, max: number}> {
    return this.http.get<{min: number, max: number}>(`${this.apiUrl}/rango-consumo`);
  }
}