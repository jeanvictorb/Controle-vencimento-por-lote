-- Script para criar a tabela de usuários do APP de Controle de Lotes
-- Execute este script no DBeaver antes de iniciar a API

CREATE TABLE APP_USUARIOS (
    CD_USUARIO    INT IDENTITY(1,1) PRIMARY KEY,
    DS_LOGIN      VARCHAR(100) NOT NULL UNIQUE,
    DS_SENHA      VARCHAR(255) NOT NULL,  -- Armazenado como BCrypt hash
    DS_NOME       VARCHAR(200) NOT NULL,
    DS_EMAIL      VARCHAR(200) NULL,
    X_ATIVO       BIT NOT NULL DEFAULT 1,
    DT_CADASTRO   DATETIME NOT NULL DEFAULT GETDATE(),
    DT_ATUALIZACAO DATETIME NOT NULL DEFAULT GETDATE()
);

-- =====================================================================
-- Inserir usuários iniciais
-- As senhas abaixo estão em texto plano - SUBSTITUA pelo hash BCrypt!
-- Para gerar o hash BCrypt, use: https://bcrypt-generator.com (rounds=10)
-- =====================================================================

-- Exemplo: usuário "admin" com senha "admin123"
-- Hash BCrypt de "admin123": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO APP_USUARIOS (DS_LOGIN, DS_SENHA, DS_NOME)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrador');

-- Adicione mais usuários conforme necessário:
-- INSERT INTO APP_USUARIOS (DS_LOGIN, DS_SENHA, DS_NOME)
-- VALUES ('joao.silva', '$2a$10$HASH_DA_SENHA_AQUI', 'João Silva');
