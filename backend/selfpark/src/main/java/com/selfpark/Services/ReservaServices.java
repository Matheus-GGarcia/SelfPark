package com.SelfPark.Services;

import com.SelfPark.Model.Reserva;
import com.SelfPark.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaServices {

    @Autowired
    private ReservaRepository repository;

    public List<Reserva> buscarPorUsuario(Long idUsuario) {
        return repository.findByUsuarioId(idUsuario);
    }

    public List<Reserva> buscarPorPlacaId(Long placaId) {
        return repository.findByPlacaId(placaId);
    }

    public List<Reserva> buscarTodas() {
        return repository.findAll();
    }

    public Reserva salvarReserva(Reserva reserva) {
        return repository.save(reserva);
    }

    public Reserva buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    }

    public List<Reserva> buscarPorPlaca(Long placaId) {
        return buscarPorPlacaId(placaId);
    }
}