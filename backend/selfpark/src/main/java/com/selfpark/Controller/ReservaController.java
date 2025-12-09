package com.selfpark.Controller;


import com.selfpark.Model.Reserva;
import com.selfpark.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaRepository respository;

    @PostMapping
    public Reserva criar(@RequestBody Reserva res){
        return  respository.save(res);
    }

    @GetMapping
    public List<Reserva> todasReserva(){
        return  respository.findAll();
    };

    @GetMapping("/{id}")
    public Optional<Reserva> reserva(@PathVariable Integer id){
        return respository.findById(Long.valueOf(id));
    };

    @DeleteMapping("/{id}")
    public void deleta(@PathVariable Long id){
        respository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Reserva atualiza(@PathVariable Long id, @RequestBody Reserva reservaDados) {

        Reserva reserva = respository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        // aqui você decide o que pode ser atualizado:
        reserva.setHoraInicial(reservaDados.getHoraInicial());
        reserva.setHoraFim(reservaDados.getHoraFim());
        // outros campos que fizerem sentido

        return respository.save(reserva);
    }
}
