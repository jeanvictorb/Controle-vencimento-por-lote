import React, { useEffect, useState } from 'react';
import LotesTable from '../components/LotesTable';
import { lotesService } from '../services/api';

function ListaPage({ titulo, descricao, fetchFn, emptyMsg }) {
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFn().then(r => setLotes(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>{titulo}</h1>
        <p>{descricao}</p>
      </div>
      {loading
        ? <div className="loading">Carregando...</div>
        : lotes.length === 0
          ? <div className="card empty-state"><p>{emptyMsg}</p></div>
          : <LotesTable lotes={lotes} />
      }
    </div>
  );
}

export function PaginaVencidos() {
  return <ListaPage
    titulo="🔴 Lotes Vencidos"
    descricao="Lotes com data de vencimento anterior à data atual."
    fetchFn={lotesService.getVencidos}
    emptyMsg="✅ Nenhum lote vencido!"
  />;
}

export function PaginaCriticos() {
  return <ListaPage
    titulo="⚠️ Lotes Críticos"
    descricao="Lotes que vencem em até 7 dias. Requerem ação imediata."
    fetchFn={lotesService.getCriticos}
    emptyMsg="✅ Nenhum lote crítico no momento!"
  />;
}

export function PaginaAtencao() {
  return <ListaPage
    titulo="🟡 Lotes em Atenção"
    descricao="Lotes que vencem entre 8 e 30 dias."
    fetchFn={lotesService.getAtencao}
    emptyMsg="✅ Nenhum lote em atenção no momento!"
  />;
}
