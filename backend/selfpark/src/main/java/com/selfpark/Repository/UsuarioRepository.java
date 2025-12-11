package com.SelfPark.Repository;

import com.SelfPark.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método para buscar usuário por email
    Optional<Usuario> findByEmail(String email);

    // Verificar se email já existe
    boolean existsByEmail(String email);

    // Buscar por email e senha (para login)
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
}