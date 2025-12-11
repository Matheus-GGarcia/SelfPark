package com.SelfPark.Controller;

import com.SelfPark.Model.Usuario;
import com.SelfPark.Services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioServices usuarioServices;

    // Buscar por email com tratamento de erro
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorEmail(@RequestParam String email) {
        try {
            Usuario usuario = usuarioServices.buscarPorEmail(email);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erro: " + e.getMessage());
        }
    }

    @GetMapping("/por-email")
    public Usuario getUsuarioPorEmail(@RequestParam String email) {
        return usuarioServices.buscarPorEmail(email);
    }

    // Buscar por email no path
    @GetMapping("/email/{email}")
    public ResponseEntity<?> buscarPorEmailPath(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioServices.buscarPorEmailOptional(email);
        return usuario.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/verificar-email")
    public ResponseEntity<?> verificarEmail(@RequestParam String email) {
        boolean existe = usuarioServices.emailExiste(email);
        return ResponseEntity.ok(existe ? "Email já cadastrado" : "Email disponível");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Usuario> usuario = usuarioServices.login(loginRequest.getEmail(), loginRequest.getSenha());

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Email ou senha incorretos");
        }
    }

    @GetMapping("/todos")
    public List<Usuario> buscarTodosUsuarios() {
        return usuarioServices.buscarTodos();
    }

    @PostMapping("/criar")
    public ResponseEntity<?> criarUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuarioServices.emailExiste(usuario.getEmail())) {
                return ResponseEntity.badRequest()
                        .body("Email já está em uso");
            }

            Usuario usuarioSalvo = usuarioServices.salvarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar usuário: " + e.getMessage());
        }
    }

    // ADICIONAR: Deletar usuário
    @DeleteMapping("/{email}")
    public ResponseEntity<?> deletarUsuario(@PathVariable String email) {
        try {
            usuarioServices.deletarPorEmail(email);
            return ResponseEntity.ok("Usuário deletado com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erro: " + e.getMessage());
        }
    }

    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }
}