package com.fsa.crudvehiculos.springbootfsa.repositorios;

import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuentaRepositorio extends JpaRepository<Cuenta, Integer> {
    Optional<Cuenta> findByCorreo(String correo);
    Optional<Cuenta> findByCedula(String cedula);
    boolean existsByCorreo(String correo);
    boolean existsByCedula(String cedula);
}