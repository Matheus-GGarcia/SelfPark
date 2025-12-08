package com.selfpark.Repository;

import com.selfpark.Model.Vagas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VagaRepository extends JpaRepository<Vagas, Long> {
}
