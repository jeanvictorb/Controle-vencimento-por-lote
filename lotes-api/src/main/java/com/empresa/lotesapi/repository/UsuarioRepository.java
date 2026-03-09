package com.empresa.lotesapi.repository;

import com.empresa.lotesapi.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // TODO: Confirmar nome do campo após receber estrutura de TBL_USUARIOS
    Optional<Usuario> findByLogin(String login);
}
