package com.empresa.lotesapi.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "TBL_LOTES")
public class Lote {

    @Id
    @Column(name = "NOCD_LOTE")
    private Integer id;

    @Column(name = "DS_LOTE")
    private String descricao;

    @Column(name = "DT_VENCIMENTO")
    private LocalDateTime dtVencimento;

    @Column(name = "DT_FABRICACAO")
    private LocalDateTime dtFabricacao;

    @Column(name = "DT_CADASTRO")
    private LocalDateTime dtCadastro;

    @Column(name = "NR_QUANTIDADE")
    private BigDecimal quantidade;

    @Column(name = "NR_QUANTIDADE_PRODUTO")
    private BigDecimal quantidadeProduto;

    @Column(name = "CD_MATERIAL")
    private Integer cdMaterial;

    @Column(name = "CD_FILIAL")
    private Integer cdFilial;

    @Column(name = "CD_EMPRESA")
    private Integer cdEmpresa;

    @Column(name = "DS_OBS")
    private String observacao;

    @Column(name = "NR_LOTE_ORIGINAL")
    private String nrLoteOriginal;

    @Column(name = "X_VALIDAR_DT_VENCIMENTO")
    private Boolean validarDtVencimento;

    @Column(name = "NR_PRAZO_VALIDADE")
    private Integer prazoValidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CD_MATERIAL", insertable = false, updatable = false)
    private Material material;
}
