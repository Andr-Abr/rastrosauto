package com.fsa.crudvehiculos.springbootfsa.repositorios;

import com.fsa.crudvehiculos.springbootfsa.modelo.Historial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistorialRepositorio extends JpaRepository<Historial, Integer> {
    List<Historial> findByCuentaIdCuentaOrderByFechaVisualizacionDesc(Integer idCuenta);
}