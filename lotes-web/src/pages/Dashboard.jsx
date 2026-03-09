import React, { useEffect, useState } from 'react';
import { lotesService } from '../services/api';
import LotesTable from '../components/LotesTable';
import './Dashboard.css';

const StatCard = ({ label, value, icon, tipo }) => (
  <div className={`stat-card stat-${tipo}`}>
    <div className="stat-top">
      <span className="stat-icon">{icon}</span>
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await lotesService.getDashboard();
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="loading">Carregando...</div>;
  if (!data) return <div className="loading">Erro ao carregar dados.</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral dos lotes por status de vencimento</p>
      </div>

      <div className="stat-grid">
        <StatCard label="Lotes Vencidos"   value={data.totalVencidos} icon="🔴" tipo="vencido" />
        <StatCard label="Críticos (≤ 7d)"  value={data.totalCriticos} icon="⚠️" tipo="critico" />
        <StatCard label="Atenção (≤ 30d)"  value={data.totalAtencao}  icon="🟡" tipo="atencao" />
        <StatCard label="Total em Alerta"  value={data.totalVencidos + data.totalCriticos + data.totalAtencao} icon="📋" tipo="total" />
      </div>

      {data.lotesVencidos.length > 0 && (
        <div className="dashboard-section">
          <h2 className="section-title vencido">🔴 Lotes Vencidos ({data.totalVencidos})</h2>
          <LotesTable lotes={data.lotesVencidos} />
        </div>
      )}

      {data.lotesCriticos.length > 0 && (
        <div className="dashboard-section">
          <h2 className="section-title critico">⚠️ Críticos — Vencem em até 7 dias ({data.totalCriticos})</h2>
          <LotesTable lotes={data.lotesCriticos} />
        </div>
      )}

      {data.lotesAtencao.length > 0 && (
        <div className="dashboard-section">
          <h2 className="section-title atencao">🟡 Atenção — Vencem em até 30 dias ({data.totalAtencao})</h2>
          <LotesTable lotes={data.lotesAtencao} />
        </div>
      )}

      {data.totalVencidos === 0 && data.totalCriticos === 0 && data.totalAtencao === 0 && (
        <div className="card empty-state">
          <p style={{ fontSize: 48, marginBottom: 12 }}>✅</p>
          <p>Nenhum lote em situação de alerta!</p>
        </div>
      )}
    </div>
  );
}
