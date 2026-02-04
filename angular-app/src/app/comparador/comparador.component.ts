import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculoService, Vehiculo } from '../services/vehiculo.service';

@Component({
  selector: 'app-comparador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
export class ComparadorComponent {
  vehiculo1: Vehiculo | null = null;
  vehiculo2: Vehiculo | null = null;
  
  sugerencias1: Vehiculo[] = [];
  sugerencias2: Vehiculo[] = [];
  
  busqueda1 = '';
  busqueda2 = '';
  
  mostrarSugerencias1 = false;
  mostrarSugerencias2 = false;

  constructor(private vehiculoService: VehiculoService) {
    console.log('✅ ComparadorComponent inicializado');
  }

  buscarVehiculo1(event: any): void {
    const query = event.target.value;
    this.busqueda1 = query;
    
    if (query.length > 2) {
      this.vehiculoService.buscarSugerencias(query).subscribe({
        next: (data) => {
          console.log('📋 Sugerencias 1:', data);
          this.sugerencias1 = data;
          this.mostrarSugerencias1 = true;
        },
        error: (error) => {
          console.error('❌ Error:', error);
          this.mostrarSugerencias1 = false;
        }
      });
    } else {
      this.mostrarSugerencias1 = false;
    }
  }

  buscarVehiculo2(event: any): void {
    const query = event.target.value;
    this.busqueda2 = query;
    
    if (query.length > 2) {
      this.vehiculoService.buscarSugerencias(query).subscribe({
        next: (data) => {
          console.log('📋 Sugerencias 2:', data);
          this.sugerencias2 = data;
          this.mostrarSugerencias2 = true;
        },
        error: (error) => {
          console.error('❌ Error:', error);
          this.mostrarSugerencias2 = false;
        }
      });
    } else {
      this.mostrarSugerencias2 = false;
    }
  }

  seleccionarVehiculo1(vehiculo: Vehiculo): void {
    console.log('🚗 Vehículo 1 seleccionado:', vehiculo);
    this.vehiculo1 = vehiculo;
    this.busqueda1 = `${vehiculo.marca} ${vehiculo.modelo}`;
    this.mostrarSugerencias1 = false;
  }

  seleccionarVehiculo2(vehiculo: Vehiculo): void {
    console.log('🚗 Vehículo 2 seleccionado:', vehiculo);
    this.vehiculo2 = vehiculo;
    this.busqueda2 = `${vehiculo.marca} ${vehiculo.modelo}`;
    this.mostrarSugerencias2 = false;
  }

  limpiarComparacion(): void {
    this.vehiculo1 = null;
    this.vehiculo2 = null;
    this.busqueda1 = '';
    this.busqueda2 = '';
    this.sugerencias1 = [];
    this.sugerencias2 = [];
    this.mostrarSugerencias1 = false;
    this.mostrarSugerencias2 = false;
  }
}