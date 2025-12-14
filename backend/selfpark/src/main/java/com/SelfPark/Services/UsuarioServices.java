package com.SelfPark.Services;

import com.SelfPark.Model.Usuario;
import com.SelfPark.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Usuario salvarUsuario(Usuario usuario) {
        // Se o usuário já tem ID, é uma atualização
        if (usuario.getId() != null && usuarioRepository.existsById(usuario.getId())) {
            return usuarioRepository.save(usuario);
        }

        // Se é um novo usuário, verifica se o email já existe
        if (emailExiste(usuario.getEmail())) {
            throw new RuntimeException("Email já está em uso: " + usuario.getEmail());
        }

        return usuarioRepository.save(usuario);
    }

    // Atualizar usuário completamente
    @Transactional
    public Usuario atualizarUsuario(String email, Usuario usuarioAtualizado) {
        // Buscar usuário existente
        Usuario usuarioExistente = buscarPorEmail(email);

        // Se o email está sendo alterado, verificar se o novo email já existe
        if (!email.equals(usuarioAtualizado.getEmail()) &&
                emailExiste(usuarioAtualizado.getEmail())) {
            throw new RuntimeException("O novo email já está em uso por outro usuário");
        }

        // Atualizar todos os campos
        usuarioExistente.setNome(usuarioAtualizado.getNome());
        usuarioExistente.setEmail(usuarioAtualizado.getEmail());

        // só altera senha se vier preenchida
        if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
            usuarioExistente.setSenha(usuarioAtualizado.getSenha());
        }

        // 🔥 FALTAVA ISSO
        usuarioExistente.setPlaca(usuarioAtualizado.getPlaca());


        return usuarioRepository.save(usuarioExistente);
    }

    // Atualizar usuário parcialmente (apenas campos fornecidos)
    @Transactional
    public Usuario atualizarParcialUsuario(String email, Usuario dadosParciais) {
        // Buscar usuário existente
        Usuario usuarioExistente = buscarPorEmail(email);

        // Atualizar apenas os campos que foram fornecidos (não nulos)
        if (dadosParciais.getNome() != null && !dadosParciais.getNome().isEmpty()) {
            usuarioExistente.setNome(dadosParciais.getNome());
        }

        // Verificar se o email está sendo alterado
        if (dadosParciais.getEmail() != null && !dadosParciais.getEmail().isEmpty()) {
            if (!email.equals(dadosParciais.getEmail()) &&
                    emailExiste(dadosParciais.getEmail())) {
                throw new RuntimeException("O novo email já está em uso por outro usuário");
            }
            usuarioExistente.setEmail(dadosParciais.getEmail());
        }

        if (dadosParciais.getSenha() != null && !dadosParciais.getSenha().isEmpty()) {
            usuarioExistente.setSenha(dadosParciais.getSenha());
        }


        return usuarioRepository.save(usuarioExistente);
    }

    // Método alternativo para atualizar por ID
    @Transactional
    public Usuario atualizarUsuarioPorId(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

        // Verificar se o email está sendo alterado
        if (!usuarioExistente.getEmail().equals(usuarioAtualizado.getEmail()) &&
                emailExiste(usuarioAtualizado.getEmail())) {
            throw new RuntimeException("O novo email já está em uso por outro usuário");
        }

        // Atualizar campos
        usuarioExistente.setNome(usuarioAtualizado.getNome());
        usuarioExistente.setEmail(usuarioAtualizado.getEmail());
        usuarioExistente.setSenha(usuarioAtualizado.getSenha());

        return usuarioRepository.save(usuarioExistente);
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
    @Transactional
    public void deletarPorEmail(String email) {
        Usuario usuario = buscarPorEmail(email);
        usuarioRepository.delete(usuario);
    }

    // Buscar usuário por ID (método útil para operações de atualização)
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    // Método para alterar apenas a senha
    @Transactional
    public Usuario alterarSenha(String email, String novaSenha) {
        Usuario usuario = buscarPorEmail(email);
        usuario.setSenha(novaSenha);
        return usuarioRepository.save(usuario);
    }

    // Método para atualizar perfil (apenas nome e telefone, por exemplo)
    @Transactional
    public Usuario atualizarPerfil(String email, String nome, String telefone) {
        Usuario usuario = buscarPorEmail(email);

        if (nome != null && !nome.isEmpty()) {
            usuario.setNome(nome);
        }


        return usuarioRepository.save(usuario);
    }
}