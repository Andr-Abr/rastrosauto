package com.fsa.crudvehiculos.springbootfsa.modelo;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Historial")
public class Historial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistorial;
    
    public Integer getIdHistorial() {
		return idHistorial;
	}

	public void setIdHistorial(Integer idHistorial) {
		this.idHistorial = idHistorial;
	}

	@ManyToOne
    @JoinColumn(name = "idCuenta")
    private Cuenta cuenta;
    
    public Cuenta getCuenta() {
		return cuenta;
	}

	public void setCuenta(Cuenta cuenta) {
		this.cuenta = cuenta;
	}

	@ManyToOne
    @JoinColumn(name = "idVehiculos")
    private Vehiculo vehiculo;
    
    public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
	}

	@Temporal(TemporalType.TIMESTAMP)
    private Date fechaVisualizacion;
    
    public Date getFechaVisualizacion() {
		return fechaVisualizacion;
	}

	public void setFechaVisualizacion(Date fechaVisualizacion) {
		this.fechaVisualizacion = fechaVisualizacion;
	}

	private String terminosBusqueda;

	public String getTerminosBusqueda() {
		return terminosBusqueda;
	}

	public void setTerminosBusqueda(String terminosBusqueda) {
		this.terminosBusqueda = terminosBusqueda;
	}
}