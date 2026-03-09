package com.empresa.lotesapi.controller;

import com.empresa.lotesapi.dto.DashboardDTO;
import com.empresa.lotesapi.dto.LoteAlertaDTO;
import com.empresa.lotesapi.service.LoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lotes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LoteController {

    private final LoteService loteService;

    // Dashboard com totais e listas por status
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDTO> getDashboard() {
        return ResponseEntity.ok(loteService.getDashboard());
    }

    // Lotes já vencidos (vermelho)
    @GetMapping("/vencidos")
    public ResponseEntity<List<LoteAlertaDTO>> getVencidos() {
        return ResponseEntity.ok(loteService.getLotesVencidos());
    }

    // Lotes criticos: vence em até 7 dias (vermelho)
    @GetMapping("/criticos")
    public ResponseEntity<List<LoteAlertaDTO>> getCriticos() {
        return ResponseEntity.ok(loteService.getLotesCriticos());
    }

    // Lotes em atenção: vence entre 8 e 30 dias (amarelo)
    @GetMapping("/atencao")
    public ResponseEntity<List<LoteAlertaDTO>> getAtencao() {
        return ResponseEntity.ok(loteService.getLotesAtencao());
    }

    // Busca por código de barras (scanner)
    @GetMapping("/buscar")
    public ResponseEntity<List<LoteAlertaDTO>> buscarPorCodigoBarra(@RequestParam String codigoBarra) {
        return ResponseEntity.ok(loteService.buscarPorCodigoBarra(codigoBarra));
    }
}
