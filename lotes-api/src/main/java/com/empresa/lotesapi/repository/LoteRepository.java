package com.empresa.lotesapi.repository;

import com.empresa.lotesapi.entity.Lote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface LoteRepository extends JpaRepository<Lote, Integer> {

    // Busca lotes que vencem até o limite informado (ex: hoje + 30 dias)
    @Query("SELECT l FROM Lote l JOIN FETCH l.material WHERE l.dtVencimento IS NOT NULL AND l.dtVencimento >= :agora AND l.dtVencimento <= :limite ORDER BY l.dtVencimento ASC")
    List<Lote> findLotesPorVencer(@Param("agora") LocalDateTime agora, @Param("limite") LocalDateTime limite);

    // Busca lotes já vencidos
    @Query("SELECT l FROM Lote l JOIN FETCH l.material WHERE l.dtVencimento IS NOT NULL AND l.dtVencimento < :agora ORDER BY l.dtVencimento DESC")
    List<Lote> findLotesVencidos(@Param("agora") LocalDateTime agora);

    // Busca por código de barras do material
    @Query("SELECT l FROM Lote l JOIN FETCH l.material m WHERE m.codigoBarra = :codigoBarra ORDER BY l.dtVencimento ASC")
    List<Lote> findByCodigoBarra(@Param("codigoBarra") String codigoBarra);

    // Busca todos os lotes com vencimento relevante (vencidos + proximos 30 dias)
    @Query("SELECT l FROM Lote l JOIN FETCH l.material WHERE l.dtVencimento IS NOT NULL AND l.dtVencimento <= :limite ORDER BY l.dtVencimento ASC")
    List<Lote> findAllRelevantes(@Param("limite") LocalDateTime limite);
}
