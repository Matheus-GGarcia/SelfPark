package com.selfpark.Controller;

import com.selfpark.Model.Usuario;
import com.selfpark.Model.Vagas;
import com.selfpark.Repository.UsuariosRepository;
import com.selfpark.Repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/vaga")
public class VagasController {

    @Autowired
    private VagaRepository vagas;

    @PostMapping
    public Vagas create(@RequestBody Vagas vaga){
        return vagas.save(vaga);
    }

    @DeleteMapping("/{id}")
    public void delete (@PathVariable Long id){
        vagas.deleteById(id);
    }

    @GetMapping("/{id}")
    public Vagas lerVaga(@PathVariable Long id) {
        return vagas.findById(id).orElseThrow(() -> new RuntimeException("Vaga não encontrado"));
    };

    @GetMapping
    public List<Vagas> todasVagas(){
        return vagas.findAll();
    }

    @PutMapping("/{id}")
    public Vagas atualiza(@PathVariable Long id, @RequestBody Vagas vag) {
        Vagas vagas1 = vagas.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        vagas1.setNumerosVagas(vag.getNumerosVagas());
        vagas1.setTipo(vag.getTipo());
        vagas1.setEstacionamento(vag.getEstacionamento());
        vagas1.setStatus(vag.getStatus());

        return vagas.save(vag);
    }
}
