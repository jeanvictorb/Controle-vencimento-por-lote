import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';
import { lotesService } from '../services/api';

export default function Layout() {
  const [counts, setCounts] = useState({ vencido: 0, critico: 0, atencao: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await lotesService.getDashboard();
        setCounts({
          vencido: res.data.totalVencidos,
          critico: res.data.totalCriticos,
          atencao: res.data.totalAtencao,
        });
      } catch {}
    };
    load();
    const interval = setInterval(load, 5 * 60 * 1000); // Atualiza a cada 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout">
      <Sidebar counts={counts} />
      <main className="layout-main">
        <div className="layout-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
