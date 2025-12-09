package com.selfpark.Controller;


import com.selfpark.Model.Usuario;
import com.selfpark.Repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@CrossOrigin("*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuariosRepository userrepository;

    @PostMapping
    public Usuario create(@RequestBody Usuario user){
        return userrepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete (@PathVariable int id){

        userrepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public Usuario usuario(@PathVariable int id) {
        return userrepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
    };


    @PutMapping("/{id}")
    public Usuario atualiza(@PathVariable int id, @RequestBody Usuario user) {
        Usuario usuario = userrepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(user.getNome());
        usuario.setEmail(user.getEmail());
        usuario.setTelefone(user.getTelefone());
        usuario.setSenha(user.getSenha());

        return userrepository.save(usuario);
    }
}
