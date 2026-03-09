package com.empresa.lotesapi.service;

import com.empresa.lotesapi.dto.DashboardDTO;
import com.empresa.lotesapi.dto.LoteAlertaDTO;
import com.empresa.lotesapi.entity.Lote;
import com.empresa.lotesapi.repository.LoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoteService {

    private final LoteRepository loteRepository;

    // Regras de negócio
    private static final int DIAS_CRITICO = 7;
    private static final int DIAS_ATENCAO = 30;

    public DashboardDTO getDashboard() {
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime limiteAtencao = agora.plusDays(DIAS_ATENCAO);

        List<Lote> vencidos = loteRepository.findLotesVencidos(agora);
        List<Lote> porVencer = loteRepository.findLotesPorVencer(agora, limiteAtencao);

        List<LoteAlertaDTO> dtosVencidos = vencidos.stream()
                .map(l -> toDTO(l, agora, "VENCIDO"))
                .collect(Collectors.toList());

        List<LoteAlertaDTO> dtosCriticos = porVencer.stream()
                .filter(l -> ChronoUnit.DAYS.between(agora, l.getDtVencimento()) <= DIAS_CRITICO)
                .map(l -> toDTO(l, agora, "CRITICO"))
                .collect(Collectors.toList());

        List<LoteAlertaDTO> dtosAtencao = porVencer.stream()
                .filter(l -> ChronoUnit.DAYS.between(agora, l.getDtVencimento()) > DIAS_CRITICO)
                .map(l -> toDTO(l, agora, "ATENCAO"))
                .collect(Collectors.toList());

        return new DashboardDTO(
                dtosVencidos.size(),
                dtosCriticos.size(),
                dtosAtencao.size(),
                dtosVencidos,
                dtosCriticos,
                dtosAtencao
        );
    }

    public List<LoteAlertaDTO> getLotesVencidos() {
        LocalDateTime agora = LocalDateTime.now();
        return loteRepository.findLotesVencidos(agora).stream()
                .map(l -> toDTO(l, agora, "VENCIDO"))
                .collect(Collectors.toList());
    }

    public List<LoteAlertaDTO> getLotesCriticos() {
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime limite = agora.plusDays(DIAS_CRITICO);
        return loteRepository.findLotesPorVencer(agora, limite).stream()
                .map(l -> toDTO(l, agora, "CRITICO"))
                .collect(Collectors.toList());
    }

    public List<LoteAlertaDTO> getLotesAtencao() {
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime limiteInicio = agora.plusDays(DIAS_CRITICO);
        LocalDateTime limiteFim = agora.plusDays(DIAS_ATENCAO);
        return loteRepository.findLotesPorVencer(limiteInicio, limiteFim).stream()
                .map(l -> toDTO(l, agora, "ATENCAO"))
                .collect(Collectors.toList());
    }

    public List<LoteAlertaDTO> buscarPorCodigoBarra(String codigoBarra) {
        LocalDateTime agora = LocalDateTime.now();
        return loteRepository.findByCodigoBarra(codigoBarra).stream()
                .map(l -> toDTO(l, agora, calcularStatus(l, agora)))
                .collect(Collectors.toList());
    }

    private String calcularStatus(Lote lote, LocalDateTime agora) {
        if (lote.getDtVencimento() == null) return "SEM_VENCIMENTO";
        long dias = ChronoUnit.DAYS.between(agora, lote.getDtVencimento());
        if (dias < 0) return "VENCIDO";
        if (dias <= DIAS_CRITICO) return "CRITICO";
        if (dias <= DIAS_ATENCAO) return "ATENCAO";
        return "OK";
    }

    private LoteAlertaDTO toDTO(Lote lote, LocalDateTime agora, String status) {
        long dias = lote.getDtVencimento() != null
                ? ChronoUnit.DAYS.between(agora, lote.getDtVencimento())
                : 0;

        String descMaterial = lote.getMaterial() != null ? lote.getMaterial().getDescricao() : "";
        String codbarra = lote.getMaterial() != null ? lote.getMaterial().getCodigoBarra() : "";

        return new LoteAlertaDTO(
                lote.getId(),
                lote.getDescricao(),
                lote.getDtVencimento(),
                lote.getQuantidade(),
                descMaterial,
                codbarra,
                lote.getCdFilial(),
                lote.getCdEmpresa(),
                status,
                dias
        );
    }
}
