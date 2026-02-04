package com.fsa.crudvehiculos.springbootfsa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AngularController {

    @Autowired
    private ResourceLoader resourceLoader;

    @GetMapping("/angular/browser/{filename:.+}")
    public ResponseEntity<Resource> serveAngularFile(@PathVariable String filename) {
        try {
            // Construir ruta del recurso
            String resourcePath = "classpath:static/angular/browser/" + filename;
            
            // Cargar recurso desde classpath (funciona tanto en desarrollo como en JAR)
            Resource resource = resourceLoader.getResource(resourcePath);
            
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }
            
            // Determinar Content-Type
            String contentType = determineContentType(filename);
            
            // Retornar archivo
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
                    
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Método helper para determinar Content-Type
    private String determineContentType(String filename) {
        if (filename.endsWith(".js")) {
            return "application/javascript";
        } else if (filename.endsWith(".css")) {
            return "text/css";
        } else if (filename.endsWith(".html")) {
            return "text/html";
        } else if (filename.endsWith(".json")) {
            return "application/json";
        } else if (filename.endsWith(".svg")) {
            return "image/svg+xml";
        } else if (filename.endsWith(".png")) {
            return "image/png";
        } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
            return "image/jpeg";
        }
        return "application/octet-stream";
    }
}