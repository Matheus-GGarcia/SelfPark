package com.selfpark.Repository;

import com.selfpark.Model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VeiculosRepository extends JpaRepository<Veiculo, Integer> {
}
