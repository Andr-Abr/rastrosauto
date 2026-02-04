package com.fsa.crudvehiculos.springbootfsa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.SecurityFilterChain;

import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import com.fsa.crudvehiculos.springbootfsa.service.CuentaService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    // Ya NO inyectamos aquí, se inyecta en el authenticationManager
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CuentaService cuentaService) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/", 
                    "/cuenta/register", 
                    "/cuenta/login", 
                    "/vehiculos/buscar",
                    "/vehiculos/resultados",
                    "/vehiculos/busqueda-avanzada",
                    "/vehiculos/comparar",
                    "/vehiculos/comparacion",           // NUEVA
                    "/vehiculos/busqueda-filtrada",     // NUEVA
                    "/vehiculos/comparar-angular",      // Mantener por compatibilidad
                    "/vehiculos/busqueda-avanzada-angular",  // Mantener por compatibilidad
                    "/vehiculos/modelos-por-marca",
                    "/vehiculos/anios-por-filtros",
                    "/vehiculos/generaciones-por-filtros",
                    "/vehiculos/motores-por-filtros",
                    "/vehiculos/combustibles-por-filtros",
                    "/vehiculos/tracciones-por-filtros",
                    "/vehiculos/carrocerias-por-filtros",
                    "/vehiculos/plazas-por-filtros", 
                    "/vehiculos/buscar-sugerencias",
                    "/vehiculos/{id}",
                    "/api/location/**",
                    "/js/**", 
                    "/css/**", 
                    "/img/**",
                    "/uploads/**",
                    "/angular/**",
                    "/angular/browser/**"
                ).permitAll()
                .requestMatchers(
                    "/cuenta/profile",
                    "/favoritos/**",
                    "/historial/**"
                ).authenticated()
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
                .loginPage("/cuenta/login")
                .loginProcessingUrl("/cuenta/login")
                .usernameParameter("correo")
                .passwordParameter("contrasenia")
                .successHandler((request, response, authentication) -> {
                    Cuenta cuenta = cuentaService.getAuthenticatedUserAccount();
                    request.getSession().setAttribute("cuenta_id", cuenta.getIdCuenta());
                    response.sendRedirect("/cuenta/profile");
                })
                .failureUrl("/cuenta/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/cuenta/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .csrf(csrf -> csrf.disable());
        
        return http.build();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    // IMPORTANTE: PasswordEncoder ahora es independiente
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}