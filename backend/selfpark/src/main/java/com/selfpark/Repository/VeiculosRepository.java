package com.selfpark.Repository;

import com.selfpark.Model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VeiculosRepository extends JpaRepository<Veiculo, Integer> {
}
