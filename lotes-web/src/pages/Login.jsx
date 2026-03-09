import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import './Login.css';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await entrar(login, senha);
  };

  const entrar = async (l, s) => {
    setErro('');
    setLoading(true);
    try {
      const res = await authService.login(l, s);
      doLogin(res.data);
      navigate('/');
    } catch {
      setErro('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => entrar('demo', 'demo');

  return (
    <div className="login-bg">
      <div className="login-box">
        <div className="login-logo">
          <div className="login-icon">📦</div>
          <h1>Controle de Lotes</h1>
          <p>Sistema de Gestão de Vencimentos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Usuário</label>
            <input
              className="input"
              type="text"
              placeholder="Digite seu usuário"
              value={login}
              onChange={e => setLogin(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              className="input"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <div className="login-error">⚠️ {erro}</div>}

          <button className="btn btn-primary login-btn" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-divider"><span>ou</span></div>

          <button
            className="btn btn-demo login-btn"
            type="button"
            onClick={handleDemo}
            disabled={loading}
          >
            👁️ Ver Demonstração (sem backend)
          </button>
        </form>
      </div>
    </div>
  );
}
