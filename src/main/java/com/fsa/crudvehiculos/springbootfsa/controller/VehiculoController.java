package com.fsa.crudvehiculos.springbootfsa.controller;

import com.fsa.crudvehiculos.springbootfsa.modelo.Vehiculo;
import com.fsa.crudvehiculos.springbootfsa.modelo.VehiculoDto;
import com.fsa.crudvehiculos.springbootfsa.service.HistorialService;
import com.fsa.crudvehiculos.springbootfsa.repositorios.VehiculoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Sort;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import jakarta.servlet.http.HttpSession;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.util.Map;
import java.util.HashMap;

@Controller
@RequestMapping("/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoRepositorio repo;

    @Autowired
    private HistorialService historialService;

    @GetMapping({"", "/"})
    public String mostrarListaVehiculos(Model modelo, 
                                        @RequestParam(defaultValue = "idVehiculos") String ordenarPor,
                                        @RequestParam(defaultValue = "asc") String direccion) {
        Sort sort = Sort.by(Sort.Direction.fromString(direccion), ordenarPor);
        List<Vehiculo> vehiculos = repo.findAll(sort);
        modelo.addAttribute("vehiculos", vehiculos);
        modelo.addAttribute("ordenarPor", ordenarPor);
        modelo.addAttribute("direccion", direccion);
        return "vehiculos/index";
    }

    @GetMapping("/agregar")
    public String mostrarFormularioAgregar(Model modelo) {
        modelo.addAttribute("vehiculoDto", new VehiculoDto());
        return "vehiculos/agregar";
    }

    @PostMapping("/agregar")
    public String agregarVehiculo(@Valid @ModelAttribute("vehiculoDto") VehiculoDto vehiculoDto, 
                                BindingResult result, Model modelo, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "vehiculos/agregar";
        }

        Vehiculo vehiculo = vehiculoDto.toVehiculo();
        
        if (vehiculoDto.getImagen() != null && !vehiculoDto.getImagen().isEmpty()) {
            String rutaImagen = guardarImagen(vehiculoDto.getImagen());
            vehiculo.setRutaImagen(rutaImagen);
        }

        repo.save(vehiculo);
        redirectAttributes.addFlashAttribute("mensaje", "Vehículo agregado exitosamente");
        return "redirect:/vehiculos";
    }

    @GetMapping("/actualizar/{idVehiculos}")
    public String mostrarFormularioActualizar(@PathVariable int idVehiculos, Model modelo) {
        Vehiculo vehiculo = repo.findById(idVehiculos)
                .orElseThrow(() -> new IllegalArgumentException("ID de vehículo inválido:" + idVehiculos));
        modelo.addAttribute("vehiculoDto", new VehiculoDto(vehiculo));
        return "vehiculos/actualizar";
    }

    @PostMapping("/actualizar")
    public String actualizarVehiculo(@Valid @ModelAttribute("vehiculoDto") VehiculoDto vehiculoDto, 
                                 BindingResult result, Model modelo, RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "vehiculos/actualizar";
        }

        Vehiculo vehiculo = vehiculoDto.toVehiculo();
        
        if (vehiculoDto.getImagen() != null && !vehiculoDto.getImagen().isEmpty()) {
            String rutaImagen = guardarImagen(vehiculoDto.getImagen());
            vehiculo.setRutaImagen(rutaImagen);
        }

        repo.save(vehiculo);
        redirectAttributes.addFlashAttribute("mensaje", "Vehículo actualizado exitosamente");
        return "redirect:/vehiculos";
    }

    @GetMapping("/eliminar")
    public String eliminarVehiculo(@RequestParam int idVehiculos, RedirectAttributes redirectAttributes) {
        try {
            repo.deleteById(idVehiculos);
            redirectAttributes.addFlashAttribute("mensaje", "Vehículo eliminado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el vehículo: " + e.getMessage());
        }
        return "redirect:/vehiculos";
    }

    private String guardarImagen(MultipartFile archivo) {
        if (archivo.isEmpty()) {
            return null;
        }
        String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename();
        try {
            Path rutaArchivos = Paths.get("src/main/resources/static/uploads");
            Files.createDirectories(rutaArchivos);
            Path rutaCompleta = rutaArchivos.resolve(nombreArchivo);
            Files.copy(archivo.getInputStream(), rutaCompleta, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + nombreArchivo;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar la imagen: " + e.getMessage());
        }
    }

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e, Model model) {
        model.addAttribute("error", e.getMessage());
        return "error";
    }

    // ========================================================================
    // ENDPOINTS PARA BÚSQUEDA JERÁRQUICA
    // ========================================================================

    /**
     * Obtiene modelos filtrados por marca
     */
    @GetMapping("/modelos-por-marca")
    @ResponseBody
    public List<String> getModelosPorMarca(@RequestParam(required = false) String marca) {
        if (marca == null || marca.isEmpty()) {
            return repo.findDistinctModelos();
        }
        return repo.findModelosByMarca(marca);
    }

    /**
     * Obtiene años filtrados por marca Y modelo
     */
    @GetMapping("/anios-por-filtros")
    @ResponseBody
    public List<Integer> getAniosPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo) {
        if ((marca == null || marca.isEmpty()) && (modelo == null || modelo.isEmpty())) {
            return repo.findDistinctAnios();
        }
        return repo.findAniosByMarcaAndModelo(marca, modelo);
    }

    /**
     * Obtiene generaciones filtradas por marca, modelo y año
     */
    @GetMapping("/generaciones-por-filtros")
    @ResponseBody
    public List<String> getGeneracionesPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctGeneraciones();
        }
        return repo.findGeneracionesByFiltros(marca, modelo, anio);
    }

    /**
     * Obtiene motores filtrados por marca, modelo y año
     */
    @GetMapping("/motores-por-filtros")
    @ResponseBody
    public List<String> getMotoresPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctMotores();
        }
        return repo.findMotoresByFiltros(marca, modelo, anio);
    }

    /**
     * Obtiene tipos de combustible filtrados
     */
    @GetMapping("/combustibles-por-filtros")
    @ResponseBody
    public List<String> getCombustiblesPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctTiposCombustible();
        }
        return repo.findTiposCombustibleByFiltros(marca, modelo, anio);
    }

    /**
     * Obtiene tipos de tracción filtrados
     */
    @GetMapping("/tracciones-por-filtros")
    @ResponseBody
    public List<String> getTraccionesPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctTiposTraccion();
        }
        return repo.findTiposTraccionByFiltros(marca, modelo, anio);
    }

    /**
     * Obtiene tipos de carrocería filtrados
     */
    @GetMapping("/carrocerias-por-filtros")
    @ResponseBody
    public List<String> getCarroceriasPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctTiposCarroceria();
        }
        return repo.findTiposCarroceriaByFiltros(marca, modelo, anio);
    }

    /**
     * Obtiene número de plazas filtrados
     */
    @GetMapping("/plazas-por-filtros")
    @ResponseBody
    public List<String> getPlazasPorFiltros(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio) {
        if (marca == null && modelo == null && anio == null) {
            return repo.findDistinctNumeroPlazas();
        }
        return repo.findNumeroPlazasByFiltros(marca, modelo, anio);
    }

    // ========================================================================
    // ENDPOINTS DE BÚSQUEDA
    // ========================================================================
    
    @GetMapping("/buscar")
    public String mostrarBusqueda(Model modelo) {
        List<String> marcas = repo.findDistinctMarcas();
        List<String> modelos = repo.findDistinctModelos();
        List<Integer> anios = repo.findDistinctAnios();
        
        modelo.addAttribute("marcas", marcas);
        modelo.addAttribute("modelos", modelos);
        modelo.addAttribute("anios", anios);
        
        return "vehiculos/buscar";
    }

    @GetMapping("/busqueda-avanzada")
    public String busquedaAvanzada(Model modelo) {
        modelo.addAttribute("marcas", repo.findDistinctMarcas());
        modelo.addAttribute("modelos", repo.findDistinctModelos());
        modelo.addAttribute("anios", repo.findDistinctAnios());
        modelo.addAttribute("generaciones", repo.findDistinctGeneraciones());
        modelo.addAttribute("motores", repo.findDistinctMotores());
        modelo.addAttribute("tiposCombustible", repo.findDistinctTiposCombustible());
        modelo.addAttribute("tiposTraccion", repo.findDistinctTiposTraccion());
        modelo.addAttribute("tiposCarroceria", repo.findDistinctTiposCarroceria());
        modelo.addAttribute("numeroPlazas", repo.findDistinctNumeroPlazas());

        modelo.addAttribute("minConsumoKmL", repo.findMinConsumoKmL());
        modelo.addAttribute("maxConsumoKmL", repo.findMaxConsumoKmL());
        modelo.addAttribute("defaultConsumoKmL", (repo.findMinConsumoKmL() + repo.findMaxConsumoKmL()) / 2);

        return "vehiculos/busqueda-avanzada";
    }
    
    @GetMapping("/resultados")
    public String resultados(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio,
            @RequestParam(required = false) String generacion,
            @RequestParam(required = false) String motor,
            @RequestParam(required = false) String tipoCombustible,
            @RequestParam(required = false) String tipoTraccion,
            @RequestParam(required = false) String tipoCarroceria,
            @RequestParam(required = false) String numeroPlazas,
            @RequestParam(required = false) Float consumoKmL,
            @RequestParam(required = false) Float consumoMinKmL,
            @RequestParam(required = false) Float consumoMaxKmL,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            HttpSession session,
            Model modeloVista) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Vehiculo> pageVehiculos = repo.buscarVehiculos(marca, modelo, anio, generacion, motor, 
                tipoCombustible, tipoTraccion, tipoCarroceria, numeroPlazas, consumoMinKmL, consumoMaxKmL, pageable);

        // Manejo de historial
        Integer cuentaId = (Integer) session.getAttribute("cuenta_id");
        if (cuentaId != null) {
            for (Vehiculo vehiculo : pageVehiculos.getContent()) {
                String terminosBusqueda = buildSearchTerms(marca, modelo, anio, generacion, motor, 
                        tipoCombustible, tipoTraccion, tipoCarroceria, numeroPlazas, consumoKmL);
                historialService.addHistorial(cuentaId, vehiculo.getIdVehiculos(), terminosBusqueda);
            }
        }
                
        modeloVista.addAttribute("vehiculos", pageVehiculos.getContent());
        modeloVista.addAttribute("currentPage", page);
        modeloVista.addAttribute("totalPages", pageVehiculos.getTotalPages());
        modeloVista.addAttribute("totalItems", pageVehiculos.getTotalElements());

        return "vehiculos/resultados";
    }
    
    private String buildSearchTerms(Object... terms) {
        return Stream.of(terms)
                     .filter(term -> term != null && !term.toString().isEmpty())
                     .map(Object::toString)
                     .collect(Collectors.joining(", "));
    }

    @GetMapping("/comparar")
    public String comparar() {
        return "vehiculos/comparar";
    }

    @GetMapping("/buscar-sugerencias")
    @ResponseBody
    public List<Vehiculo> buscarSugerencias(@RequestParam String query) {
        return repo.findSuggestions(query);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Vehiculo getVehicleDetails(@PathVariable int id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Vehículo no encontrado"));
    }
    
    @GetMapping("/comparacion")  // NUEVA RUTA
    public String comparacion() {
        return "vehiculos/comparar-angular";
    }
    
    @GetMapping("/busqueda-filtrada")  // NUEVA RUTA
    public String busquedaFiltrada() {
        return "vehiculos/busqueda-avanzada-angular";
    }

    @GetMapping("/rango-consumo")
    @ResponseBody
    public Map<String, Float> getRangoConsumo() {
        Map<String, Float> rango = new HashMap<>();
        rango.put("min", repo.findMinConsumoKmL());
        rango.put("max", repo.findMaxConsumoKmL());
        return rango;
    }
    
    @GetMapping("/marcas")
    @ResponseBody
    public List<String> getMarcas() {
        return repo.findDistinctMarcas();
    }
}