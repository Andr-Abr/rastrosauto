package com.fsa.crudvehiculos.springbootfsa.service;

import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import com.fsa.crudvehiculos.springbootfsa.modelo.Favorito;
import com.fsa.crudvehiculos.springbootfsa.modelo.Vehiculo;
import com.fsa.crudvehiculos.springbootfsa.repositorios.FavoritoRepositorio;
import com.fsa.crudvehiculos.springbootfsa.repositorios.CuentaRepositorio;
import com.fsa.crudvehiculos.springbootfsa.repositorios.VehiculoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {
    @Autowired
    private FavoritoRepositorio favoritoRepository;

    @Autowired
    private CuentaRepositorio cuentaRepository;

    @Autowired
    private VehiculoRepositorio vehiculoRepository;

    public List<Favorito> getFavoritosByIdCuenta(Integer idCuenta) {
        return favoritoRepository.findByCuentaIdCuenta(idCuenta);
    }

    public Favorito addFavorito(Integer idCuenta, Integer idVehiculos) {
        Favorito favorito = new Favorito();
        Cuenta cuenta = cuentaRepository.findById(idCuenta).orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
        Vehiculo vehiculo = vehiculoRepository.findById(idVehiculos).orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        
        favorito.setCuenta(cuenta);
        favorito.setVehiculo(vehiculo);
        
        return favoritoRepository.save(favorito);
    }

    public void deleteFavorito(Integer id, Integer idCuenta) {
        Favorito favorito = favoritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        if (!favorito.getCuenta().getIdCuenta().equals(idCuenta)) {
            throw new RuntimeException("No tienes permiso para eliminar este favorito");
        }
        favoritoRepository.delete(favorito);
    }

    public void updateCategoriaFavorito(Integer id, String categoria, Integer idCuenta) {
        Favorito favorito = favoritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        if (!favorito.getCuenta().getIdCuenta().equals(idCuenta)) {
            throw new RuntimeException("No tienes permiso para actualizar este favorito");
        }
        favorito.setCategoriaFavorito(categoria);
        favoritoRepository.save(favorito);
    }

    public void updateEtiquetaFavorito(Integer id, String etiqueta, Integer idCuenta) {
        Favorito favorito = favoritoRepository.findById(id).orElseThrow(() -> new RuntimeException("Favorito no encontrado"));
        if (!favorito.getCuenta().getIdCuenta().equals(idCuenta)) {
            throw new RuntimeException("No tienes permiso para actualizar este favorito");
        }
        favorito.setEtiquetaFavorito(etiqueta);
        favoritoRepository.save(favorito);
    }
}