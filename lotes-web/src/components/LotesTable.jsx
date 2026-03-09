import React from 'react';
import './LotesTable.css';

const STATUS_LABEL = {
  VENCIDO: { label: 'Vencido',  cls: 'badge-vencido' },
  CRITICO: { label: 'Crítico',  cls: 'badge-critico' },
  ATENCAO: { label: 'Atenção',  cls: 'badge-atencao' },
  OK:      { label: 'OK',       cls: 'badge-ok'      },
};

function formatDate(dt) {
  if (!dt) return '—';
  const d = new Date(dt);
  return d.toLocaleDateString('pt-BR');
}

function formatQtd(v) {
  if (v == null) return '—';
  return Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 3 });
}

export default function LotesTable({ lotes }) {
  if (!lotes || lotes.length === 0) {
    return (
      <div className="card empty-state">
        <p>Nenhum lote encontrado.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição do Lote</th>
            <th>Produto</th>
            <th>Cód. Barras</th>
            <th>Vencimento</th>
            <th>Dias</th>
            <th>Qtd.</th>
            <th>Filial</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map(l => {
            const s = STATUS_LABEL[l.statusAlerta] || {};
            const dias = l.diasParaVencimento;
            return (
              <tr key={l.id}>
                <td className="td-id">{l.id}</td>
                <td className="td-desc">{l.descricaoLote || '—'}</td>
                <td className="td-produto">{l.descricaoMaterial || '—'}</td>
                <td className="td-code">{l.codigoBarra || '—'}</td>
                <td className="td-date">{formatDate(l.dataVencimento)}</td>
                <td>
                  <span className={`dias-badge ${l.statusAlerta?.toLowerCase()}`}>
                    {dias >= 0 ? `${dias}d` : `${Math.abs(dias)}d atrás`}
                  </span>
                </td>
                <td>{formatQtd(l.quantidade)}</td>
                <td>{l.cdFilial ?? '—'}</td>
                <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
