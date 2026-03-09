package com.empresa.lotesapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private long totalVencidos;
    private long totalCriticos;
    private long totalAtencao;
    private List<LoteAlertaDTO> lotesVencidos;
    private List<LoteAlertaDTO> lotesCriticos;
    private List<LoteAlertaDTO> lotesAtencao;
}
