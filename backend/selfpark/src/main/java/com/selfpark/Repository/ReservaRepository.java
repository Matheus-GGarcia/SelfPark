package com.selfpark.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.selfpark.Model.Placa;
import com.selfpark.Model.Reserva;
import com.selfpark.Model.Usuario;

import java.util.List;




public interface ReservaRepository extends JpaRepository<Reserva, Integer>{

    List<Reserva> findByUsuario(Usuario usuario);  // Se renomeou idUsuario para usuario
    
    List<Reserva> findByUsuario_Id(Integer usuarioId);
    
    List<Reserva> findByPlaca(Placa placa);  // Se renomeou idPlaca para placa
    
    List<Reserva> findByPlaca_Id(Integer placaId);
}
