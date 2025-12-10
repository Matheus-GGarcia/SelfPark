package com.selfpark.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.selfpark.Model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
