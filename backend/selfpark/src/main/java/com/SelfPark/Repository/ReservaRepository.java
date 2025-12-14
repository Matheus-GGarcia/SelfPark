package com.SelfPark.Repository;

import com.SelfPark.Model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    // CORRIGIR: findByUsuarioId (não findByIdUsuario)
    List<Reserva> findByUsuarioId(Long usuarioId);

    // CORRIGIR: findByPlaca_NumeroPlaca (se quiser buscar pelo número)
    // OU findByPlacaId (se quiser buscar pelo ID)
    List<Reserva> findByPlacaId(Long placaId);

    // Se quiser buscar pelo número da placa:
    @Query("SELECT r FROM Reserva r WHERE r.placa.numeroPlaca = :numeroPlaca")
    List<Reserva> findByNumeroPlaca(@Param("numeroPlaca") String numeroPlaca);

}


