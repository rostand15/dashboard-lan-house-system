import React, { useState, useEffect } from 'react';
import { initialComputadores } from '../data/computadores';
import './Computadores.css';

function Computadores() {
  const [computadores, setComputadores] = useState(() => {
    const saved = localStorage.getItem('computadores');
    return saved ? JSON.parse(saved) : initialComputadores;
  });

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  
  const [modalAberto, setModalAberto] = useState(false);
  const [pcEmEdicao, setPcEmEdicao] = useState(null);

  useEffect(() => {
    localStorage.setItem('computadores', JSON.stringify(computadores));
  }, [computadores]);

  useEffect(() => {
    const interval = setInterval(() => {
      setComputadores(prev =>
        prev.map(pc => {
          if (pc.status === 'em_uso' && pc.tempoRestante > 0) {
            const novoTempo = pc.tempoRestante - 1;
            return novoTempo === 0 
              ? { ...pc, status: 'livre', cliente: null, tempoRestante: 0 }
              : { ...pc, tempoRestante: novoTempo };
          }
          return pc;
        })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const abrirEdicao = (pc) => {
    setPcEmEdicao({ ...pc });
    setModalAberto(true);
  };

  const salvarModificacoes = (e) => {
    e.preventDefault();
    setComputadores(prev =>
      prev.map(pc => (pc.id === pcEmEdicao.id ? pcEmEdicao : pc))
    );
    setModalAberto(false);
    setPcEmEdicao(null);
  };

  const encerrarSessao = (id) => {
    if (window.confirm("Deseja encerrar a sessão deste computador?")) {
      setComputadores(prev =>
        prev.map(pc => pc.id === id ? { ...pc, status: 'livre', cliente: null, tempoRestante: 0 } : pc)
      );
    }
  };

  const formatarTempo = (minutos) => {
    if (minutos <= 0) return "Tempo esgotado";
    const hrs = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}min rest.`;
  };

  const pcsFiltrados = computadores.filter(pc => {
    const bateBusca = pc.nome.toLowerCase().includes(busca.toLowerCase()) ||
                     (pc.cliente && pc.cliente.toLowerCase().includes(busca.toLowerCase()));
    const bateStatus = filtroStatus === 'todos' || pc.status === filtroStatus;
    return bateBusca && bateStatus;
  });

  return (
    <div className="computadores-container">
      <h2>Gerenciamento de Estações</h2>

      <div className="controls-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por PC ou cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="filter-buttons">
          <button onClick={() => setFiltroStatus('todos')} className={`filter-btn ${filtroStatus === 'todos' ? 'active' : ''}`}>Todos</button>
          <button onClick={() => setFiltroStatus('livre')} className={`filter-btn ${filtroStatus === 'livre' ? 'active' : ''}`}>Livres</button>
          <button onClick={() => setFiltroStatus('em_uso')} className={`filter-btn ${filtroStatus === 'em_uso' ? 'active' : ''}`}>Em Uso</button>
          <button onClick={() => setFiltroStatus('manutencao')} className={`filter-btn ${filtroStatus === 'manutencao' ? 'active' : ''}`}>Manutenção</button>
        </div>
      </div>

      <div className="pcs-grid">
        {pcsFiltrados.map((pc) => (
          <div key={pc.id} className={`pc-card ${pc.status}`}>
            <div className="pc-header">
              <h3 className="pc-title">{pc.nome}</h3>
              <span className={`badge ${pc.status}`}>{pc.status.replace('_', ' ')}</span>
            </div>
            
            <div className="pc-body">
              <p className="pc-specs">💻 {pc.especificacoes}</p>
              {pc.status === 'em_uso' ? (
                <>
                  <p className="pc-client"><strong>Usuário:</strong> {pc.cliente}</p>
                  <p className="pc-time">⏰ {formatarTempo(pc.tempoRestante)}</p>
                </>
              ) : pc.status === 'manutencao' ? (
                <p className="pc-warning">⚠️ Indisponível para uso.</p>
              ) : (
                <p className="pc-available">🟢 Disponível para uso.</p>
              )}
            </div>

            <div className="pc-actions">
              <button onClick={() => abrirEdicao(pc)} className="btn-action btn-edit">Modificar</button>
              {pc.status === 'em_uso' && (
                <button onClick={() => encerrarSessao(pc.id)} className="btn-action btn-release">Liberar</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalAberto && pcEmEdicao && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modificar Máquina: {pcEmEdicao.nome}</h3>
            <form onSubmit={salvarModificacoes}>
              <label>Nome do Computador:</label>
              <input 
                type="text" 
                value={pcEmEdicao.nome} 
                onChange={(e) => setPcEmEdicao({...pcEmEdicao, nome: e.target.value})} 
                required 
              />

              <label>Especificações Técnicas:</label>
              <input 
                type="text" 
                value={pcEmEdicao.especificacoes} 
                onChange={(e) => setPcEmEdicao({...pcEmEdicao, especificacoes: e.target.value})} 
                required 
              />

              <label>Status:</label>
              <select 
                value={pcEmEdicao.status} 
                onChange={(e) => {
                  const status = e.target.value;
                  setPcEmEdicao({
                    ...pcEmEdicao, 
                    status,
                    cliente: status !== 'em_uso' ? '' : pcEmEdicao.cliente,
                    tempoRestante: status !== 'em_uso' ? 0 : pcEmEdicao.tempoRestante
                  });
                }}
              >
                <option value="livre">Livre</option>
                <option value="em_uso">Em Uso</option>
                <option value="manutencao">Manutenção</option>
              </select>

              {pcEmEdicao.status === 'em_uso' && (
                <>
                  <label>Nome do Cliente:</label>
                  <input 
                    type="text" 
                    value={pcEmEdicao.cliente || ''} 
                    onChange={(e) => setPcEmEdicao({...pcEmEdicao, cliente: e.target.value})} 
                    required 
                  />

                  <label>Tempo de Sessão (em minutos):</label>
                  <input 
                    type="number" 
                    value={pcEmEdicao.tempoRestante || ''} 
                    onChange={(e) => setPcEmEdicao({...pcEmEdicao, tempoRestante: parseInt(e.target.value) || 0})} 
                    required 
                  />
                </>
              )}

              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Computadores;