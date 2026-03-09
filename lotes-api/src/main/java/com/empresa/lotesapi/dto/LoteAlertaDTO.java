package com.empresa.lotesapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoteAlertaDTO {
    private Integer id;
    private String descricaoLote;
    private LocalDateTime dataVencimento;
    private BigDecimal quantidade;
    private String descricaoMaterial;
    private String codigoBarra;
    private Integer cdFilial;
    private Integer cdEmpresa;
    private String statusAlerta;   // VENCIDO | CRITICO | ATENCAO
    private long diasParaVencimento;
}
