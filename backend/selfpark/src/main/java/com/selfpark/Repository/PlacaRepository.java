package com.selfpark.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.selfpark.Model.Placa;
import com.selfpark.Model.Usuario;

import java.util.List;


public interface PlacaRepository extends JpaRepository<Placa, Integer>{
    
    List<Placa> findByUsuario(Usuario usuario);  // Busca pelo objeto Usuario
    
    List<Placa> findByUsuario_Id(Integer usuarioId);
} 
