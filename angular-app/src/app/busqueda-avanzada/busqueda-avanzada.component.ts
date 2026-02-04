import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltrosService } from '../services/filtros.service';

@Component({
  selector: 'app-busqueda-avanzada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.css']
})
export class BusquedaAvanzadaComponent implements OnInit {
  // Opciones de los selectores
  marcas: string[] = [];
  modelos: string[] = [];
  anios: number[] = [];
  generaciones: string[] = [];
  motores: string[] = [];
  tiposCombustible: string[] = [];
  tiposTraccion: string[] = [];
  tiposCarroceria: string[] = [];
  numeroPlazas: string[] = [];

  // Valores seleccionados
  marcaSeleccionada: string = '';
  modeloSeleccionado: string = '';
  anioSeleccionado: number | null = null;
  generacionSeleccionada: string = '';
  motorSeleccionado: string = '';
  combustibleSeleccionado: string = '';
  traccionSeleccionada: string = '';
  carroceriaSeleccionada: string = '';
  plazasSeleccionadas: string | null = null;
  
  // Rango de consumo
  consumoMin: number = 0;
  consumoMax: number = 100;
  consumoMinSeleccionado: number = 0;   // NUEVO: punto mínimo
  consumoMaxSeleccionado: number = 100; // NUEVO: punto máximo

  constructor(private filtrosService: FiltrosService) {
    console.log('✅ BusquedaAvanzadaComponent inicializado');
  }
  
  ordenarPlazas(plazas: string[]): string[] {
    return plazas.sort((a, b) => {
      // Extraer el primer número de cada valor
      const numA = parseInt(a.split('-')[0]);
      const numB = parseInt(b.split('-')[0]);
      return numA - numB;
    });
  }

  ngOnInit(): void {
    // Cargar TODO al inicio para permitir búsqueda libre
    this.cargarMarcas();
    this.cargarTodosSinFiltro();
    this.cargarRangoConsumo();
  }

  // ========== CARGA INICIAL (SIN FILTROS - BÚSQUEDA LIBRE) ==========
  
  cargarMarcas(): void {
    this.filtrosService.getMarcas().subscribe({
      next: (data) => {
        this.marcas = data;
        console.log('📋 Marcas cargadas:', data.length);
      },
      error: (error) => console.error('❌ Error cargando marcas:', error)
    });
  }

  cargarTodosSinFiltro(): void {
    // Cargar TODAS las opciones sin filtros para búsqueda libre
    
    // Modelos
    this.filtrosService.getModelosPorMarca('').subscribe({
      next: (data) => {
        this.modelos = data;
        console.log('📋 Modelos sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Años
    this.filtrosService.getAniosPorFiltros().subscribe({
      next: (data) => {
        this.anios = data;
        console.log('📋 Años sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Generaciones
    this.filtrosService.getGeneracionesPorFiltros().subscribe({
      next: (data) => {
        this.generaciones = data;
        console.log('📋 Generaciones sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Motores
    this.filtrosService.getMotoresPorFiltros().subscribe({
      next: (data) => {
        this.motores = data;
        console.log('📋 Motores sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Combustibles
    this.filtrosService.getCombustiblesPorFiltros().subscribe({
      next: (data) => {
        this.tiposCombustible = data;
        console.log('📋 Combustibles sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Tracciones
    this.filtrosService.getTraccionesPorFiltros().subscribe({
      next: (data) => {
        this.tiposTraccion = data;
        console.log('📋 Tracciones sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Carrocerías
    this.filtrosService.getCarroceriasPorFiltros().subscribe({
      next: (data) => {
        this.tiposCarroceria = data;
        console.log('📋 Carrocerías sin filtro:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Plazas
	this.filtrosService.getPlazasPorFiltros().subscribe({
	  next: (data) => {
	    this.numeroPlazas = this.ordenarPlazas(data);
	    console.log('📋 Plazas sin filtro:', data.length);
	  },
	  error: (error) => console.error('❌ Error:', error)
	});
  }

  cargarRangoConsumo(): void {
    this.filtrosService.getRangoConsumo().subscribe({
      next: (data) => {
        this.consumoMin = data.min;
        this.consumoMax = data.max;
        this.consumoMinSeleccionado = data.min;  // NUEVO
        this.consumoMaxSeleccionado = data.max;  // NUEVO
        console.log('📊 Rango consumo:', data);
      },
      error: (error) => console.error('❌ Error cargando rango consumo:', error)
    });
  }

  // ========== EVENTOS DE CAMBIO (BÚSQUEDA JERÁRQUICA Y LIBRE) ==========

  onMarcaChange(): void {
    console.log('🚗 Marca seleccionada:', this.marcaSeleccionada);
    
    if (this.marcaSeleccionada) {
      // Si HAY marca seleccionada, aplicar filtrado jerárquico
      this.cargarModelos();
      this.cargarAnios();
      this.cargarFiltrosAdicionales();
    } else {
      // Si NO hay marca (se deseleccionó), volver a búsqueda libre
      this.cargarTodosSinFiltro();
    }
  }

  onModeloChange(): void {
    console.log('📦 Modelo seleccionado:', this.modeloSeleccionado);
    
    if (this.marcaSeleccionada || this.modeloSeleccionado) {
      // Si hay marca o modelo, aplicar filtrado
      this.cargarAnios();
      this.cargarFiltrosAdicionales();
    }
  }

  onAnioChange(): void {
    console.log('📅 Año seleccionado:', this.anioSeleccionado);
    
    if (this.marcaSeleccionada || this.modeloSeleccionado || this.anioSeleccionado) {
      // Si hay algún filtro principal, actualizar filtros adicionales
      this.cargarFiltrosAdicionales();
    }
  }
  
  // Agregar después de la línea 198 (después de onAnioChange())

  onConsumoMinChange(): void {
    // Evitar que el mínimo supere al máximo
    if (this.consumoMinSeleccionado > this.consumoMaxSeleccionado) {
      this.consumoMinSeleccionado = this.consumoMaxSeleccionado;
    }
  }

  onConsumoMaxChange(): void {
    // Evitar que el máximo sea menor que el mínimo
    if (this.consumoMaxSeleccionado < this.consumoMinSeleccionado) {
      this.consumoMaxSeleccionado = this.consumoMinSeleccionado;
    }
  }

  // ========== CARGA DE FILTROS JERÁRQUICOS ==========

  cargarModelos(): void {
    if (!this.marcaSeleccionada) return;
    
    this.filtrosService.getModelosPorMarca(this.marcaSeleccionada).subscribe({
      next: (data) => {
        this.modelos = data;
        console.log('📋 Modelos filtrados:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });
  }

  cargarAnios(): void {
    this.filtrosService.getAniosPorFiltros(
      this.marcaSeleccionada || undefined,
      this.modeloSeleccionado || undefined
    ).subscribe({
      next: (data) => {
        this.anios = data;
        console.log('📋 Años cargados:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });
  }

  cargarFiltrosAdicionales(): void {
    const marca = this.marcaSeleccionada || undefined;
    const modelo = this.modeloSeleccionado || undefined;
    const anio = this.anioSeleccionado || undefined;

    // Cargar generaciones
    this.filtrosService.getGeneracionesPorFiltros(marca, modelo, anio).subscribe({
      next: (data) => {
        this.generaciones = data;
        console.log('📋 Generaciones:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar motores
    this.filtrosService.getMotoresPorFiltros(marca, modelo, anio).subscribe({
      next: (data) => {
        this.motores = data;
        console.log('📋 Motores:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar combustibles CON FILTROS
    this.filtrosService.getCombustiblesPorFiltros(marca, modelo, anio).subscribe({
      next: (data) => {
        this.tiposCombustible = data;
        console.log('📋 Combustibles:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar tracciones CON FILTROS
    this.filtrosService.getTraccionesPorFiltros(marca, modelo, anio).subscribe({
      next: (data) => {
        this.tiposTraccion = data;
        console.log('📋 Tracciones:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar carrocerías CON FILTROS
    this.filtrosService.getCarroceriasPorFiltros(marca, modelo, anio).subscribe({
      next: (data) => {
        this.tiposCarroceria = data;
        console.log('📋 Carrocerías:', data.length);
      },
      error: (error) => console.error('❌ Error:', error)
    });

    // Cargar plazas CON FILTROS
	this.filtrosService.getPlazasPorFiltros(marca, modelo, anio).subscribe({
	  next: (data) => {
	    this.numeroPlazas = this.ordenarPlazas(data);
	    console.log('📋 Plazas:', data.length);
	  },
	  error: (error) => console.error('❌ Error:', error)
	});
  }

  // ========== SUBMIT ==========

  buscar(): void {
    // Construir parámetros de búsqueda
    const params = new URLSearchParams();
    
    if (this.marcaSeleccionada) params.append('marca', this.marcaSeleccionada);
    if (this.modeloSeleccionado) params.append('modelo', this.modeloSeleccionado);
    if (this.anioSeleccionado) params.append('anio', this.anioSeleccionado.toString());
    if (this.generacionSeleccionada) params.append('generacion', this.generacionSeleccionada);
    if (this.motorSeleccionado) params.append('motor', this.motorSeleccionado);
    if (this.combustibleSeleccionado) params.append('tipoCombustible', this.combustibleSeleccionado);
    if (this.traccionSeleccionada) params.append('tipoTraccion', this.traccionSeleccionada);
    if (this.carroceriaSeleccionada) params.append('tipoCarroceria', this.carroceriaSeleccionada);
    if (this.plazasSeleccionadas) params.append('numeroPlazas', this.plazasSeleccionadas.toString());
	if (this.consumoMinSeleccionado) params.append('consumoMinKmL', this.consumoMinSeleccionado.toString());
	if (this.consumoMaxSeleccionado) params.append('consumoMaxKmL', this.consumoMaxSeleccionado.toString());

    // Redirigir a la vista de resultados (Thymeleaf)
    const url = `/vehiculos/resultados?${params.toString()}`;
    console.log('🔍 Redirigiendo a:', url);
    window.location.href = url;
  }

  limpiarFiltros(): void {
    // Limpiar selecciones
    this.marcaSeleccionada = '';
    this.modeloSeleccionado = '';
    this.anioSeleccionado = null;
    this.generacionSeleccionada = '';
    this.motorSeleccionado = '';
    this.combustibleSeleccionado = '';
    this.traccionSeleccionada = '';
    this.carroceriaSeleccionada = '';
    this.plazasSeleccionadas = null;
	this.consumoMinSeleccionado = this.consumoMin;
	this.consumoMaxSeleccionado = this.consumoMax;
    
    // Recargar TODO sin filtros
    this.cargarTodosSinFiltro();
    
    console.log('🧹 Filtros limpiados - Búsqueda libre activada');
  }
}