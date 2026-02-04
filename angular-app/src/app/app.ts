import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparadorComponent } from './comparador/comparador.component';
import { BusquedaAvanzadaComponent } from './busqueda-avanzada/busqueda-avanzada.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ComparadorComponent, BusquedaAvanzadaComponent],
  template: `
    <app-comparador *ngIf="mostrarComparador"></app-comparador>
    <app-busqueda-avanzada *ngIf="mostrarBusqueda"></app-busqueda-avanzada>
    <div *ngIf="!mostrarComparador && !mostrarBusqueda" class="text-center text-white p-5">
      <h2>Cargando...</h2>
    </div>
  `
})
export class AppComponent implements OnInit {
  mostrarComparador = false;
  mostrarBusqueda = false;

  ngOnInit() {
    // Detectar la ruta actual
    const path = window.location.pathname;
    console.log('🔍 Ruta detectada:', path);

	if (path.includes('comparacion')) {
	    this.mostrarComparador = true;
	    console.log('✅ Mostrando Comparador');
	  } else if (path.includes('busqueda-filtrada')) {
	    this.mostrarBusqueda = true;
	    console.log('✅ Mostrando Búsqueda Avanzada');
	  } else {
	    console.warn('⚠️ Ruta no reconocida');
	  }
  }
}