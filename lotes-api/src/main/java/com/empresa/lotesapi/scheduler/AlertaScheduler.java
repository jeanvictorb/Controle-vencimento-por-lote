package com.empresa.lotesapi.scheduler;

import com.empresa.lotesapi.dto.LoteAlertaDTO;
import com.empresa.lotesapi.service.LoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlertaScheduler {

    private final LoteService loteService;

    /**
     * Executa todo dia às 07:00 da manhã.
     * Cron: segundo minuto hora dia mês diaSemana
     */
    @Scheduled(cron = "0 0 7 * * *")
    public void verificarLotesVencendo() {
        log.info("[SCHEDULER] Iniciando verificação diária de lotes - {}", LocalDate.now());

        List<LoteAlertaDTO> vencidos = loteService.getLotesVencidos();
        List<LoteAlertaDTO> criticos = loteService.getLotesCriticos();
        List<LoteAlertaDTO> atencao  = loteService.getLotesAtencao();

        log.warn("[SCHEDULER] Lotes VENCIDOS: {}", vencidos.size());
        log.warn("[SCHEDULER] Lotes CRÍTICOS (vence em até 7 dias): {}", criticos.size());
        log.info("[SCHEDULER] Lotes em ATENÇÃO (vence em até 30 dias): {}", atencao.size());

        // TODO: Após configurar Firebase, enviar push notification aqui
        // Exemplo:
        // if (!criticos.isEmpty() || !vencidos.isEmpty()) {
        //     firebaseService.enviarNotificacaoGrupo("Alerta de Vencimento",
        //         vencidos.size() + " lotes vencidos, " + criticos.size() + " críticos");
        // }

        log.info("[SCHEDULER] Verificação concluída.");
    }
}
