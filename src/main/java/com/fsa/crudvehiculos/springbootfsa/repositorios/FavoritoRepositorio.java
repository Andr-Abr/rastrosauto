package com.fsa.crudvehiculos.springbootfsa.repositorios;


import com.fsa.crudvehiculos.springbootfsa.modelo.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritoRepositorio extends JpaRepository<Favorito, Integer> {
    List<Favorito> findByCuentaIdCuenta(Integer idCuenta);
}
