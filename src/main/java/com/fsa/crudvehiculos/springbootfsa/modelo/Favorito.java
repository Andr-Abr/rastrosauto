package com.fsa.crudvehiculos.springbootfsa.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "Favoritos")
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFavoritos;
    
    public Integer getIdFavoritos() {
		return idFavoritos;
	}
	public void setIdFavoritos(Integer idFavoritos) {
		this.idFavoritos = idFavoritos;
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
	
	private String categoriaFavorito;
    private String etiquetaFavorito;
    
	public String getCategoriaFavorito() {
		return categoriaFavorito;
	}
	public void setCategoriaFavorito(String categoriaFavorito) {
		this.categoriaFavorito = categoriaFavorito;
	}
	public String getEtiquetaFavorito() {
		return etiquetaFavorito;
	}
	public void setEtiquetaFavorito(String etiquetaFavorito) {
		this.etiquetaFavorito = etiquetaFavorito;
	}
}