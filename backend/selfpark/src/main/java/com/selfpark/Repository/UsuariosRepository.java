package com.selfpark.Repository;

import com.selfpark.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuario, Integer> {

}
