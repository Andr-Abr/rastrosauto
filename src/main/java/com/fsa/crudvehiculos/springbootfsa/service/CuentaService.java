package com.fsa.crudvehiculos.springbootfsa.service;

import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import com.fsa.crudvehiculos.springbootfsa.repositorios.CuentaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CuentaService implements UserDetailsService {

    @Autowired
    private CuentaRepositorio cuentaRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(Cuenta cuenta) {
        if (cuentaRepositorio.existsByCorreo(cuenta.getCorreo())) {
            return "El correo ya está registrado";
        }
        if (cuentaRepositorio.existsByCedula(cuenta.getCedula())) {
            return "La cédula ya está registrada";
        }

        cuenta.setContrasenia(passwordEncoder.encode(cuenta.getContrasenia()));
        cuentaRepositorio.save(cuenta);
        return "SUCCESS";
    }
    
    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Cuenta cuenta = cuentaRepositorio.findByCorreo(correo)
            .orElseThrow(() -> new UsernameNotFoundException(
                "Usuario no encontrado con correo: " + correo));
        
        return new org.springframework.security.core.userdetails.User(
            cuenta.getCorreo(), 
            cuenta.getContrasenia(), 
            new ArrayList<>());
    }

    public Cuenta getAuthenticatedUserAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return cuentaRepositorio.findByCorreo(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    public Cuenta getCuentaById(Integer idCuenta) {
        return cuentaRepositorio.findById(idCuenta)
            .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
    }

    public String updateEmail(Integer idCuenta, String newEmail) {
        Cuenta cuenta = cuentaRepositorio.findById(idCuenta)
            .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
            
        if (cuentaRepositorio.existsByCorreo(newEmail) && 
            !cuenta.getCorreo().equals(newEmail)) {
            return "El nuevo correo ya está en uso";
        }
        
        cuenta.setCorreo(newEmail);
        cuentaRepositorio.save(cuenta);
        return "SUCCESS";
    }

    public String updatePassword(Integer idCuenta, String currentPassword, String newPassword) {
        Cuenta cuenta = cuentaRepositorio.findById(idCuenta)
            .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
            
        if (!passwordEncoder.matches(currentPassword, cuenta.getContrasenia())) {
            return "La contraseña actual es incorrecta";
        }
        
        cuenta.setContrasenia(passwordEncoder.encode(newPassword));
        cuentaRepositorio.save(cuenta);
        return "SUCCESS";
    }

    public void deleteCuenta(Integer idCuenta) {
        if (cuentaRepositorio.existsById(idCuenta)) {
            cuentaRepositorio.deleteById(idCuenta);
        }
    }
}