package com.fsa.crudvehiculos.springbootfsa.controller;

import com.fsa.crudvehiculos.springbootfsa.modelo.Historial;
import com.fsa.crudvehiculos.springbootfsa.service.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/historial")
public class HistorialController {
    @Autowired
    private HistorialService historialService;

    @GetMapping
    public String index(HttpSession session, Model model) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        List<Historial> historial = historialService.getHistorialByIdCuenta(cuentaId);
        model.addAttribute("historial", historial);
        return "historial/historial";
    }

    @PostMapping
    public String store(@RequestParam Integer idVehiculos, 
                       @RequestParam String terminosBusqueda, 
                       HttpSession session) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        historialService.addHistorial(cuentaId, idVehiculos, terminosBusqueda);
        return "redirect:/historial";
    }

    @PostMapping("/eliminar")
    public String destroy(HttpSession session, RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        historialService.deleteAllHistorialByIdCuenta(cuentaId);
        redirectAttributes.addFlashAttribute("success", "Historial borrado exitosamente");
        return "redirect:/historial";
    }
}