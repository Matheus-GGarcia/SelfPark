package com.SelfPark.Services;

import com.SelfPark.Model.Usuario;
import com.SelfPark.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServices {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Buscar usuário por email
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o email: " + email));
    }

    // Buscar usuário por email (retorna Optional)
    public Optional<Usuario> buscarPorEmailOptional(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Buscar todos os usuários
    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    // Salvar/atualizar usuário
    public Usuario salvarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Verificar se email existe
    public boolean emailExiste(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    // Login do usuário
    public Optional<Usuario> login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha);
    }

    // Deletar usuário por email
    public void deletarPorEmail(String email) {
        Usuario usuario = buscarPorEmail(email);
        usuarioRepository.delete(usuario);
    }
}