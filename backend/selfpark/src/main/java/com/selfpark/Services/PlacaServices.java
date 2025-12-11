package com.SelfPark.Services;

import com.SelfPark.Model.Placa;
import com.SelfPark.Repository.PlacaRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@Service
public class PlacaServices {

    @Autowired
    private PlacaRepository placaRepository;

    public Placa salvarPlaca(Placa placa) {
        return placaRepository.save(placa);
    }

    public List<Placa> buscarTodas() {
        return placaRepository.findAll();
    }
}
