package com.fsa.crudvehiculos.springbootfsa.controller;

import com.fsa.crudvehiculos.springbootfsa.modelo.Favorito;
import com.fsa.crudvehiculos.springbootfsa.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/favoritos")
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;

    @GetMapping
    public String index(HttpSession session, Model model) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        List<Favorito> favoritos = favoritoService.getFavoritosByIdCuenta(cuentaId);
        model.addAttribute("favoritos", favoritos);
        return "favorito/favoritos";
    }

    @PostMapping("/agregar")
    public String store(@RequestParam Integer idVehiculos,
                       @RequestParam(required = false) String marca,
                       @RequestParam(required = false) String modelo,
                       @RequestParam(required = false) Integer anio,
                       @RequestParam(required = false) String generacion,
                       @RequestParam(required = false) String motor,
                       @RequestParam(required = false) String tipoCombustible,
                       @RequestParam(required = false) String tipoTraccion,
                       @RequestParam(required = false) String tipoCarroceria,
                       @RequestParam(required = false) String numeroPlazas,
                       @RequestParam(required = false) Float consumoMinKmL,  // NUEVO
                       @RequestParam(required = false) Float consumoMaxKmL,  // NUEVO
                       @RequestParam(defaultValue = "0") int page,
                       HttpSession session,
                       RedirectAttributes redirectAttributes) {
       Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        favoritoService.addFavorito(cuentaId, idVehiculos);
        redirectAttributes.addFlashAttribute("success", "Vehículo agregado a favoritos");
        
        // Construir URL con parámetros de búsqueda
        StringBuilder redirectUrl = new StringBuilder("redirect:/vehiculos/resultados?");
        if (marca != null && !marca.isEmpty()) redirectUrl.append("marca=").append(marca).append("&");
        if (modelo != null && !modelo.isEmpty()) redirectUrl.append("modelo=").append(modelo).append("&");
        if (anio != null) redirectUrl.append("anio=").append(anio).append("&");
        if (generacion != null && !generacion.isEmpty()) redirectUrl.append("generacion=").append(generacion).append("&");
        if (motor != null && !motor.isEmpty()) redirectUrl.append("motor=").append(motor).append("&");
        if (tipoCombustible != null && !tipoCombustible.isEmpty()) redirectUrl.append("tipoCombustible=").append(tipoCombustible).append("&");
        if (tipoTraccion != null && !tipoTraccion.isEmpty()) redirectUrl.append("tipoTraccion=").append(tipoTraccion).append("&");
        if (tipoCarroceria != null && !tipoCarroceria.isEmpty()) redirectUrl.append("tipoCarroceria=").append(tipoCarroceria).append("&");
        if (numeroPlazas != null) redirectUrl.append("numeroPlazas=").append(numeroPlazas).append("&");
        if (consumoMinKmL != null) redirectUrl.append("consumoMinKmL=").append(consumoMinKmL).append("&");  // NUEVO
        if (consumoMaxKmL != null) redirectUrl.append("consumoMaxKmL=").append(consumoMaxKmL).append("&");  // NUEVO
        redirectUrl.append("page=").append(page);
        
        return redirectUrl.toString();
    }

    @PostMapping("/{id}/eliminar")
    public String destroy(@PathVariable Integer id, 
                         HttpSession session,
                         RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        favoritoService.deleteFavorito(id, cuentaId);
        redirectAttributes.addFlashAttribute("success", "Vehículo eliminado de favoritos");
        return "redirect:/favoritos";
    }

    @PostMapping("/{id}/categoria")
    public String updateCategoria(@PathVariable Integer id, 
                                  @RequestParam String categoria, 
                                  HttpSession session,
                                  RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        favoritoService.updateCategoriaFavorito(id, categoria, cuentaId);
        redirectAttributes.addFlashAttribute("success", "Categoría actualizada");
        return "redirect:/favoritos";
    }

    @PostMapping("/{id}/etiqueta")
    public String updateEtiqueta(@PathVariable Integer id, 
                                @RequestParam String etiqueta, 
                                HttpSession session,
                                RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        favoritoService.updateEtiquetaFavorito(id, etiqueta, cuentaId);
        redirectAttributes.addFlashAttribute("success", "Etiqueta actualizada");
        return "redirect:/favoritos";
    }
}