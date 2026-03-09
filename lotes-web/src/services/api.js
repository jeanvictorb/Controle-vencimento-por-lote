import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── MOCK DATA (modo demo) ────────────────────────────────────────────────────
const hoje = new Date();
const addDias = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString(); };

const MOCK_LOTES_VENCIDOS = [
  { id: 101, descricaoLote: 'LOTE-2024-001', dataVencimento: addDias(-10), quantidade: 50,   descricaoMaterial: 'HERBICIDA GLIFOSATO 480 SL',    codigoBarra: '7896543210011', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'VENCIDO', diasParaVencimento: -10 },
  { id: 102, descricaoLote: 'LOTE-2024-002', dataVencimento: addDias(-3),  quantidade: 120,  descricaoMaterial: 'FUNGICIDA TEBUCONAZOL 200 EC',   codigoBarra: '7896543210022', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'VENCIDO', diasParaVencimento: -3  },
  { id: 103, descricaoLote: 'LOTE-2024-003', dataVencimento: addDias(-1),  quantidade: 30,   descricaoMaterial: 'INSETICIDA CLORPIRIFÓS 480 EC',  codigoBarra: '7896543210033', cdFilial: 2, cdEmpresa: 1, statusAlerta: 'VENCIDO', diasParaVencimento: -1  },
];

const MOCK_LOTES_CRITICOS = [
  { id: 201, descricaoLote: 'LOTE-2025-004', dataVencimento: addDias(2),   quantidade: 200,  descricaoMaterial: 'ADUBO NPK 4-14-8',              codigoBarra: '7896543210044', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'CRITICO', diasParaVencimento: 2  },
  { id: 202, descricaoLote: 'LOTE-2025-005', dataVencimento: addDias(5),   quantidade: 88,   descricaoMaterial: 'SEMENTE DE SOJA TRANSGÊNICA',    codigoBarra: '7896543210055', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'CRITICO', diasParaVencimento: 5  },
  { id: 203, descricaoLote: 'LOTE-2025-006', dataVencimento: addDias(7),   quantidade: 45,   descricaoMaterial: 'FERTILIZANTE FOLIAR BORO',      codigoBarra: '7896543210066', cdFilial: 3, cdEmpresa: 1, statusAlerta: 'CRITICO', diasParaVencimento: 7  },
];

const MOCK_LOTES_ATENCAO = [
  { id: 301, descricaoLote: 'LOTE-2025-007', dataVencimento: addDias(12),  quantidade: 300,  descricaoMaterial: 'CALCÁRIO DOLOMÍTICO',           codigoBarra: '7896543210077', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'ATENCAO', diasParaVencimento: 12 },
  { id: 302, descricaoLote: 'LOTE-2025-008', dataVencimento: addDias(20),  quantidade: 75,   descricaoMaterial: 'HERBICIDA 2,4-D AMINA 720',     codigoBarra: '7896543210088', cdFilial: 2, cdEmpresa: 1, statusAlerta: 'ATENCAO', diasParaVencimento: 20 },
  { id: 303, descricaoLote: 'LOTE-2025-009', dataVencimento: addDias(28),  quantidade: 410,  descricaoMaterial: 'SEMENTE DE MILHO HÍBRIDO',      codigoBarra: '7896543210099', cdFilial: 1, cdEmpresa: 1, statusAlerta: 'ATENCAO', diasParaVencimento: 28 },
  { id: 304, descricaoLote: 'LOTE-2025-010', dataVencimento: addDias(30),  quantidade: 60,   descricaoMaterial: 'INSETICIDA IMIDACLOPRIDO 700',  codigoBarra: '7896543210100', cdFilial: 3, cdEmpresa: 1, statusAlerta: 'ATENCAO', diasParaVencimento: 30 },
];

const MOCK_DASHBOARD = {
  totalVencidos: MOCK_LOTES_VENCIDOS.length,
  totalCriticos: MOCK_LOTES_CRITICOS.length,
  totalAtencao:  MOCK_LOTES_ATENCAO.length,
  lotesVencidos: MOCK_LOTES_VENCIDOS,
  lotesCriticos: MOCK_LOTES_CRITICOS,
  lotesAtencao:  MOCK_LOTES_ATENCAO,
};

const mock = (data) => Promise.resolve({ data });
// ─────────────────────────────────────────────────────────────────────────────

const isDemoMode = () => localStorage.getItem('demoMode') === 'true';

export const authService = {
  login: (login, senha) => {
    if (login === 'demo' && senha === 'demo') {
      localStorage.setItem('demoMode', 'true');
      return mock({ token: 'demo-token', nome: 'Modo Demo', cdUsuario: 0 });
    }
    return api.post('/api/auth/login', { login, senha });
  },
};

export const lotesService = {
  getDashboard: () => isDemoMode()
    ? mock(MOCK_DASHBOARD)
    : api.get('/api/lotes/dashboard'),

  getVencidos: () => isDemoMode()
    ? mock(MOCK_LOTES_VENCIDOS)
    : api.get('/api/lotes/vencidos'),

  getCriticos: () => isDemoMode()
    ? mock(MOCK_LOTES_CRITICOS)
    : api.get('/api/lotes/criticos'),

  getAtencao: () => isDemoMode()
    ? mock(MOCK_LOTES_ATENCAO)
    : api.get('/api/lotes/atencao'),

  buscarBarcode: (codigo) => isDemoMode()
    ? mock([...MOCK_LOTES_VENCIDOS, ...MOCK_LOTES_CRITICOS, ...MOCK_LOTES_ATENCAO]
        .filter(l => l.codigoBarra.includes(codigo)))
    : api.get(`/api/lotes/buscar?codigoBarra=${codigo}`),
};

export default api;
