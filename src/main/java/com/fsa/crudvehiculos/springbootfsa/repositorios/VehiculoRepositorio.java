package com.fsa.crudvehiculos.springbootfsa.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fsa.crudvehiculos.springbootfsa.modelo.Vehiculo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VehiculoRepositorio extends JpaRepository<Vehiculo, Integer> {
	
	// ========================================================================
	// QUERIES JERÁRQUICAS COMPLETAS
	// ========================================================================
	
	/**
	 * Obtiene modelos filtrados por marca
	 */
	@Query("SELECT DISTINCT v.modelo FROM Vehiculo v WHERE v.marca = :marca ORDER BY v.modelo")
	List<String> findModelosByMarca(@Param("marca") String marca);
	
	/**
	 * Obtiene años filtrados por marca Y modelo
	 */
	@Query("SELECT DISTINCT v.anio FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) " +
	       "ORDER BY v.anio DESC")
	List<Integer> findAniosByMarcaAndModelo(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo);
	
	/**
	 * Obtiene generaciones filtradas por marca, modelo y año
	 */
	@Query("SELECT DISTINCT v.generacion FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.generacion")
	List<String> findGeneracionesByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	/**
	 * Obtiene motores filtrados por marca, modelo y año
	 */
	@Query("SELECT DISTINCT v.motor FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.motor")
	List<String> findMotoresByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	/**
	 * Obtiene tipos de combustible filtrados
	 */
	@Query("SELECT DISTINCT v.tipoCombustible FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.tipoCombustible")
	List<String> findTiposCombustibleByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	/**
	 * Obtiene tipos de tracción filtrados
	 */
	@Query("SELECT DISTINCT v.tipoTraccion FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.tipoTraccion")
	List<String> findTiposTraccionByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	/**
	 * Obtiene tipos de carrocería filtrados
	 */
	@Query("SELECT DISTINCT v.tipoCarroceria FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.tipoCarroceria")
	List<String> findTiposCarroceriaByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	/**
	 * Obtiene número de plazas filtrados
	 */
	@Query("SELECT DISTINCT v.numeroPlazas FROM Vehiculo v WHERE " +
	       "(:marca IS NULL OR v.marca = :marca) AND " +
	       "(:modelo IS NULL OR v.modelo = :modelo) AND " +
	       "(:anio IS NULL OR v.anio = :anio) " +
	       "ORDER BY v.numeroPlazas")
	List<String> findNumeroPlazasByFiltros(
	    @Param("marca") String marca, 
	    @Param("modelo") String modelo,
	    @Param("anio") Integer anio);
	
	// ========================================================================
	// QUERIES BÁSICAS (sin filtros)
	// ========================================================================
	
	@Query("SELECT DISTINCT v.marca FROM Vehiculo v ORDER BY v.marca")
	List<String> findDistinctMarcas();

	@Query("SELECT DISTINCT v.modelo FROM Vehiculo v ORDER BY v.modelo")
	List<String> findDistinctModelos();

	@Query("SELECT DISTINCT v.anio FROM Vehiculo v ORDER BY v.anio DESC")
	List<Integer> findDistinctAnios();
	
	@Query("SELECT DISTINCT v.generacion FROM Vehiculo v ORDER BY v.generacion")
	List<String> findDistinctGeneraciones();

	@Query("SELECT DISTINCT v.motor FROM Vehiculo v ORDER BY v.motor")
	List<String> findDistinctMotores();

	@Query("SELECT DISTINCT v.tipoCombustible FROM Vehiculo v ORDER BY v.tipoCombustible")
	List<String> findDistinctTiposCombustible();

	@Query("SELECT DISTINCT v.tipoTraccion FROM Vehiculo v ORDER BY v.tipoTraccion")
	List<String> findDistinctTiposTraccion();

	@Query("SELECT DISTINCT v.tipoCarroceria FROM Vehiculo v ORDER BY v.tipoCarroceria")
	List<String> findDistinctTiposCarroceria();

	@Query("SELECT DISTINCT v.numeroPlazas FROM Vehiculo v ORDER BY v.numeroPlazas")
	List<String> findDistinctNumeroPlazas();
	
	@Query("SELECT MIN(v.consumoKmL) FROM Vehiculo v")
	Float findMinConsumoKmL();
	
	@Query("SELECT MAX(v.consumoKmL) FROM Vehiculo v")
	Float findMaxConsumoKmL();
	
	// ========================================================================
	// BÚSQUEDA Y SUGERENCIAS
	// ========================================================================
	
	@Query("SELECT v FROM Vehiculo v WHERE " +
		       "(:marca IS NULL OR :marca = '' OR v.marca = :marca) AND " +
		       "(:modelo IS NULL OR :modelo = '' OR v.modelo = :modelo) AND " +
		       "(:anio IS NULL OR v.anio = :anio) AND " +
		       "(:generacion IS NULL OR :generacion = '' OR v.generacion = :generacion) AND " +
		       "(:motor IS NULL OR :motor = '' OR v.motor = :motor) AND " +
		       "(:tipoCombustible IS NULL OR :tipoCombustible = '' OR v.tipoCombustible = :tipoCombustible) AND " +
		       "(:tipoTraccion IS NULL OR :tipoTraccion = '' OR v.tipoTraccion = :tipoTraccion) AND " +
		       "(:tipoCarroceria IS NULL OR :tipoCarroceria = '' OR v.tipoCarroceria = :tipoCarroceria) AND " +
		       "(:numeroPlazas IS NULL OR :numeroPlazas = '' OR v.numeroPlazas = :numeroPlazas) AND " +
		       "(:consumoMinKmL IS NULL OR v.consumoKmL >= :consumoMinKmL) AND " +
		       "(:consumoMaxKmL IS NULL OR v.consumoKmL <= :consumoMaxKmL)")
		Page<Vehiculo> buscarVehiculos(
		    @Param("marca") String marca, 
		    @Param("modelo") String modelo, 
		    @Param("anio") Integer anio, 
		    @Param("generacion") String generacion, 
		    @Param("motor") String motor, 
		    @Param("tipoCombustible") String tipoCombustible,
		    @Param("tipoTraccion") String tipoTraccion, 
		    @Param("tipoCarroceria") String tipoCarroceria, 
		    @Param("numeroPlazas") String numeroPlazas, 
		    @Param("consumoMinKmL") Float consumoMinKmL,  // NUEVO
		    @Param("consumoMaxKmL") Float consumoMaxKmL,  // NUEVO
		    Pageable pageable
		);

	@Query("SELECT v FROM Vehiculo v WHERE " +
	       "LOWER(v.marca) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
	       "LOWER(v.modelo) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
	       "CAST(v.anio AS string) LIKE CONCAT('%', :query, '%') OR " +
	       "LOWER(v.motor) LIKE LOWER(CONCAT('%', :query, '%'))")
	List<Vehiculo> findSuggestions(@Param("query") String query);
}