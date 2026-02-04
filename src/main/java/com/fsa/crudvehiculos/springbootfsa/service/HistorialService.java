package com.fsa.crudvehiculos.springbootfsa.service;

import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import com.fsa.crudvehiculos.springbootfsa.modelo.Historial;
import com.fsa.crudvehiculos.springbootfsa.modelo.Vehiculo;
import com.fsa.crudvehiculos.springbootfsa.repositorios.HistorialRepositorio;
import com.fsa.crudvehiculos.springbootfsa.repositorios.CuentaRepositorio;
import com.fsa.crudvehiculos.springbootfsa.repositorios.VehiculoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class HistorialService {
    @Autowired
    private HistorialRepositorio historialRepository;

    @Autowired
    private CuentaRepositorio cuentaRepository;

    @Autowired
    private VehiculoRepositorio vehiculoRepository;

    public List<Historial> getHistorialByIdCuenta(Integer idCuenta) {
        return historialRepository.findByCuentaIdCuentaOrderByFechaVisualizacionDesc(idCuenta);
    }

    public Historial addHistorial(Integer idCuenta, Integer idVehiculos, String terminosBusqueda) {
        Historial historial = new Historial();
        Cuenta cuenta = cuentaRepository.findById(idCuenta).orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
        Vehiculo vehiculo = vehiculoRepository.findById(idVehiculos).orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        
        historial.setCuenta(cuenta);
        historial.setVehiculo(vehiculo);
        historial.setFechaVisualizacion(new Date());
        historial.setTerminosBusqueda(terminosBusqueda);
        
        return historialRepository.save(historial);
    }

    public void deleteAllHistorialByIdCuenta(Integer idCuenta) {
        List<Historial> historialList = historialRepository.findByCuentaIdCuentaOrderByFechaVisualizacionDesc(idCuenta);
        historialRepository.deleteAll(historialList);
    }
}