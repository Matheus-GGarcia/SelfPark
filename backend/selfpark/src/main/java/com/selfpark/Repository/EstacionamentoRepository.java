package com.selfpark.Repository;

import com.selfpark.Model.Estacionamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EstacionamentoRepository extends JpaRepository<Estacionamento, Integer> {

}
