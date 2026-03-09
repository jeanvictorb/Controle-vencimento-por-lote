package com.empresa.lotesapi.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "APP_USUARIOS")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CD_USUARIO")
    private Integer id;

    @Column(name = "DS_LOGIN", nullable = false, unique = true)
    private String login;

    @Column(name = "DS_SENHA", nullable = false)
    private String senha;  // Armazenado como BCrypt hash

    @Column(name = "DS_NOME", nullable = false)
    private String nome;

    @Column(name = "DS_EMAIL")
    private String email;

    @Column(name = "X_ATIVO")
    private Boolean ativo = true;

    @Column(name = "DT_CADASTRO")
    private LocalDateTime dtCadastro;

    @Column(name = "DT_ATUALIZACAO")
    private LocalDateTime dtAtualizacao;
}
