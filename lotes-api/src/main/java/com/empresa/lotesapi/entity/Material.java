package com.empresa.lotesapi.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TBL_MATERIAIS")
public class Material {

    @Id
    @Column(name = "CD_MATERIAL")
    private Integer id;

    @Column(name = "DS_MATERIAL")
    private String descricao;

    @Column(name = "DS_MATERIAL_NF")
    private String descricaoNf;

    @Column(name = "CD_CODBARRA")
    private String codigoBarra;

    @Column(name = "X_ATIVO")
    private Boolean ativo;

    @Column(name = "CD_SUBGRUPO")
    private Integer cdSubgrupo;

    @Column(name = "CD_MARCA")
    private Integer cdMarca;
}
