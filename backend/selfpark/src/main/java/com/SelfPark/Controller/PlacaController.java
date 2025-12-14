package com.SelfPark.Controller;

import com.SelfPark.Model.Placa;
import com.SelfPark.Services.PlacaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/placas")
public class PlacaController {

    @Autowired
    private PlacaServices placaService;

    @PostMapping("/criar")
    public ResponseEntity<?> criarPlaca(@RequestBody Placa placa) {
        try {
            Placa placaSalva = placaService.salvarPlaca(placa);
            return ResponseEntity.status(HttpStatus.CREATED).body(placaSalva);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/todos")
    public List<Placa> buscarTodas() {
        return placaService.buscarTodas();
    }
}
