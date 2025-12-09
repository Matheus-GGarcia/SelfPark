package com.selfpark.Controller;


import com.selfpark.Model.Reserva;
import com.selfpark.Model.Veiculo;
import com.selfpark.Repository.VeiculosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/veiculo")
public class VeiculoController {

    @Autowired
    VeiculosRepository veiculoRepository;

    @PostMapping
    public Veiculo criar(@RequestBody Veiculo veiculo){
        return veiculoRepository.save(veiculo);
    }

    @GetMapping
    public List<Veiculo> lerVeiculos(){
        return veiculoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Veiculo> lerVeiculo(@PathVariable Integer id){
        return veiculoRepository.findById(id);
    };

    @DeleteMapping("/{id}")
    public void deleta(@PathVariable Integer id){
        veiculoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Veiculo atualiza(@PathVariable Integer id, @RequestBody Veiculo dados) {

        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        // Atualize apenas os campos que você quer permitir
        veiculo.setPlaca(dados.getPlaca());
        veiculo.setModelo(dados.getModelo());
        veiculo.setCor(dados.getCor());

        return veiculoRepository.save(veiculo);
    }



}
