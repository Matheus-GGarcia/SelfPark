package com.SelfPark.Controller;

import com.SelfPark.Model.Reserva;
import com.SelfPark.Services.ReservaServices;  // ADICIONAR
import org.springframework.beans.factory.annotation.Autowired;  // ADICIONAR
import org.springframework.web.bind.annotation.*;
import java.util.List;  // ADICIONAR

@CrossOrigin("*")
@RestController
@RequestMapping("/reservas")  // ADICIONAR PATH
public class ReservaController {

    @Autowired  // ADICIONAR
    private ReservaServices reservaServices;  // ADICIONAR

    // ENDPOINTS FALTANDO
    @GetMapping("/usuario/{usuarioId}")
    public List<Reserva> buscarPorUsuario(@PathVariable Long usuarioId) {
        return reservaServices.buscarPorUsuario(usuarioId);
    }

    @GetMapping("/placa/{placaId}")
    public List<Reserva> buscarPorPlaca(@PathVariable Long placaId) {
        return reservaServices.buscarPorPlaca(placaId);
    }
}