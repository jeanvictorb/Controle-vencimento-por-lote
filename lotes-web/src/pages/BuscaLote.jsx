import React, { useState } from 'react';
import LotesTable from '../components/LotesTable';
import { lotesService } from '../services/api';

export default function BuscaLote() {
  const [codigo, setCodigo] = useState('');
  const [lotes, setLotes] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleBusca = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    setLoading(true); setErro(''); setBuscado(false);
    try {
      const res = await lotesService.buscarBarcode(codigo.trim());
      setLotes(res.data);
      setBuscado(true);
    } catch {
      setErro('Erro ao buscar. Verifique o código e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>🔍 Buscar Lote</h1>
        <p>Busque um lote pelo código de barras do produto</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <form onSubmit={handleBusca} style={{ display:'flex', gap:12, alignItems:'flex-end' }}>
          <div style={{ flex:1 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:500, marginBottom:6 }}>
              Código de Barras
            </label>
            <input
              className="input"
              type="text"
              placeholder="Digite ou escanear o código de barras..."
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              autoFocus
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Buscando...' : '🔍 Buscar'}
          </button>
          {codigo && (
            <button className="btn btn-secondary" type="button" onClick={() => { setCodigo(''); setLotes([]); setBuscado(false); }}>
              Limpar
            </button>
          )}
        </form>

        {erro && (
          <div style={{ marginTop:12, color:'var(--danger)', fontSize:13 }}>⚠️ {erro}</div>
        )}
      </div>

      {buscado && (
        lotes.length > 0
          ? <LotesTable lotes={lotes} />
          : (
            <div className="card empty-state">
              <p style={{ fontSize:36, marginBottom:8 }}>🔎</p>
              <p>Nenhum lote encontrado para o código <strong>{codigo}</strong></p>
            </div>
          )
      )}
    </div>
  );
}
