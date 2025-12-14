package com.SelfPark.Repository;


import com.SelfPark.Model.Placa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacaRepository extends JpaRepository<Placa, Long> {
}
