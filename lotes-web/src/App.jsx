import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import { PaginaVencidos, PaginaCriticos, PaginaAtencao } from './pages/ListaLotes';
import BuscaLote from './pages/BuscaLote';

function PrivateRoute({ children }) {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index         element={<Dashboard />} />
        <Route path="vencidos" element={<PaginaVencidos />} />
        <Route path="criticos" element={<PaginaCriticos />} />
        <Route path="atencao"  element={<PaginaAtencao />} />
        <Route path="buscar"   element={<BuscaLote />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
