package com.fsa.crudvehiculos.springbootfsa.controller;

import com.fsa.crudvehiculos.springbootfsa.modelo.CuentaDto;
import com.fsa.crudvehiculos.springbootfsa.modelo.Cuenta;
import com.fsa.crudvehiculos.springbootfsa.service.CuentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/cuenta")
public class CuentaController {

    @Autowired
    private CuentaService cuentaService;

    @GetMapping("/login")
    public String showLoginForm(Model model, 
                                @RequestParam(required = false) String error,
                                @RequestParam(required = false) String logout) {
        if (error != null) {
            model.addAttribute("error", "Credenciales inválidas");
        }
        if (logout != null) {
            model.addAttribute("success", "Has cerrado sesión correctamente");
        }
        model.addAttribute("cuentaDto", new CuentaDto());
        return "cuenta/login";
    }

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("cuentaDto", new CuentaDto());
        return "cuenta/register";
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("cuentaDto") CuentaDto cuentaDto, 
                          BindingResult bindingResult, 
                          Model model,
                          RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "cuenta/register";
        }

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date fechaNacimiento = dateFormat.parse(cuentaDto.getFechaNacimiento());
            
            Cuenta cuenta = new Cuenta();
            cuenta.setNombres(cuentaDto.getNombres());
            cuenta.setApellidos(cuentaDto.getApellidos());
            cuenta.setSexo(cuentaDto.getSexo());
            cuenta.setFechaNacimiento(fechaNacimiento);
            cuenta.setPais(cuentaDto.getPais());
            cuenta.setDepartamento(cuentaDto.getDepartamento());
            cuenta.setCiudad(cuentaDto.getCiudad());
            cuenta.setCorreo(cuentaDto.getCorreo());
            cuenta.setCedula(cuentaDto.getCedula());
            cuenta.setContrasenia(cuentaDto.getContrasenia());

            String result = cuentaService.register(cuenta);
            
            if (result.equals("SUCCESS")) {
                redirectAttributes.addFlashAttribute("success", 
                    "Cuenta creada exitosamente. Por favor, inicie sesión.");
                return "redirect:/cuenta/login";
            } else {
                model.addAttribute("error", result);
                return "cuenta/register";
            }
        } catch (ParseException e) {
            model.addAttribute("error", "Formato de fecha inválido");
            return "cuenta/register";
        }
    }

    @GetMapping("/profile")
    public String showProfile(Model model, HttpSession session) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        
        Cuenta cuenta = cuentaService.getCuentaById(cuentaId);
        model.addAttribute("cuenta", cuenta);
        return "cuenta/profile";
    }

    @PostMapping("/update-email")
    public String updateEmail(@RequestParam String newEmail, 
                             HttpSession session,
                             RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        
        String result = cuentaService.updateEmail(cuentaId, newEmail);
        if (result.equals("SUCCESS")) {
            redirectAttributes.addFlashAttribute("success", 
                "Correo electrónico actualizado correctamente");
        } else {
            redirectAttributes.addFlashAttribute("error", result);
        }
        return "redirect:/cuenta/profile";
    }

    @PostMapping("/update-password")
    public String updatePassword(@RequestParam String currentPassword,
                                @RequestParam String newPassword,
                                @RequestParam String newPasswordConfirmation,
                                HttpSession session,
                                RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        
        if (!newPassword.equals(newPasswordConfirmation)) {
            redirectAttributes.addFlashAttribute("error", 
                "Las contraseñas no coinciden");
            return "redirect:/cuenta/profile";
        }
        
        String result = cuentaService.updatePassword(cuentaId, currentPassword, newPassword);
        if (result.equals("SUCCESS")) {
            redirectAttributes.addFlashAttribute("success", 
                "Contraseña actualizada correctamente");
        } else {
            redirectAttributes.addFlashAttribute("error", result);
        }
        return "redirect:/cuenta/profile";
    }

    @PostMapping("/delete")
    public String deleteCuenta(HttpSession session, RedirectAttributes redirectAttributes) {
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId == null) {
            return "redirect:/cuenta/login";
        }
        
        cuentaService.deleteCuenta(cuentaId);
        session.invalidate();
        redirectAttributes.addFlashAttribute("success", 
            "Tu cuenta ha sido eliminada exitosamente");
        return "redirect:/cuenta/login";
    }
}