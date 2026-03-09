import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const nav = [
  { path: '/',          label: 'Dashboard',    icon: '📊' },
  { path: '/vencidos',  label: 'Vencidos',     icon: '🔴', badge: 'vencido' },
  { path: '/criticos',  label: 'Críticos',     icon: '⚠️', badge: 'critico' },
  { path: '/atencao',   label: 'Atenção',      icon: '🟡', badge: 'atencao' },
  { path: '/buscar',    label: 'Buscar Lote',  icon: '🔍' },
];

export default function Sidebar({ counts }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">📦</span>
        <div>
          <span className="sidebar-brand-name">Controle de Lotes</span>
          <span className="sidebar-brand-sub">Gestão de Vencimentos</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-label">{item.label}</span>
            {item.badge && counts?.[item.badge] > 0 && (
              <span className={`sidebar-count ${item.badge}`}>{counts[item.badge]}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{usuario?.nome?.[0] ?? '?'}</div>
          <span className="sidebar-user-name">{usuario?.nome}</span>
        </div>
        <button className="sidebar-logout" onClick={handleLogout} title="Sair">⏻</button>
      </div>
    </aside>
  );
}
