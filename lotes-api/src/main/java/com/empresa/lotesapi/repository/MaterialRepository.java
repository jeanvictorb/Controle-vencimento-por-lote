package com.empresa.lotesapi.repository;

import com.empresa.lotesapi.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    Optional<Material> findByCodigoBarra(String codigoBarra);
}
