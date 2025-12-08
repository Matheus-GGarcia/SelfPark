package com.selfpark.Repository;

import com.selfpark.Model.UsuarioPJ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioPjRepository extends JpaRepository<UsuarioPJ, Integer> {

}
