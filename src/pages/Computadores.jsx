import React, { useState, useEffect } from "react";
import { initialComputadores } from "../data/computadores";
import "./Computadores.css";

function Computadores() {
  const [computadores, setComputadores] = useState(() => {
    const saved = localStorage.getItem("computadores");
    return saved ? JSON.parse(saved) : initialComputadores;
  });

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const [modalAberto, setModalAberto] = useState(false);
  const [pcEmEdicao, setPcEmEdicao] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "computadores",
      JSON.stringify(computadores)
    );
  }, [computadores]);

  useEffect(() => {
    const interval = setInterval(() => {
      setComputadores((prev) =>
        prev.map((pc) => {
          if (
            pc.status === "em_uso" &&
            pc.tempoRestante > 0
          ) {
            const novoTempo =
              pc.tempoRestante - 1;

            return novoTempo === 0
              ? {
                  ...pc,
                  status: "livre",
                  cliente: "",
                  tempoRestante: 0,
                }
              : {
                  ...pc,
                  tempoRestante: novoTempo,
                };
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

    let pcAtualizado = { ...pcEmEdicao };

    if (
      pcAtualizado.cliente &&
      pcAtualizado.cliente.trim() !== ""
    ) {
      pcAtualizado.status = "em_uso";
    } else {
      pcAtualizado.status = "livre";
      pcAtualizado.tempoRestante = 0;
    }

    setComputadores((prev) =>
      prev.map((pc) =>
        pc.id === pcAtualizado.id
          ? pcAtualizado
          : pc
      )
    );

    setModalAberto(false);
    setPcEmEdicao(null);
  };

  const encerrarSessao = (id) => {
    setComputadores((prev) =>
      prev.map((pc) =>
        pc.id === id
          ? {
              ...pc,
              status: "livre",
              cliente: "",
              tempoRestante: 0,
            }
          : pc
      )
    );
  };

  const formatarTempo = (minutos) => {
    if (minutos <= 0)
      return "Tempo esgotado";

    const hrs = Math.floor(minutos / 60);
    const mins = minutos % 60;

    return `${
      hrs > 0 ? `${hrs}h ` : ""
    }${mins}min restantes`;
  };

  const pcsFiltrados = computadores.filter(
    (pc) => {
      const bateBusca =
        pc.nome
          .toLowerCase()
          .includes(busca.toLowerCase()) ||
        (pc.cliente &&
          pc.cliente
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            ));

      const bateStatus =
        filtroStatus === "todos" ||
        pc.status === filtroStatus;

      return bateBusca && bateStatus;
    }
  );

  return (
    <div className="computadores-container">
      <h2>Gerenciamento de Estações</h2>

      <div className="controls-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

        <div className="filter-buttons">
          <button
            onClick={() =>
              setFiltroStatus("todos")
            }
            className={`filter-btn ${
              filtroStatus === "todos"
                ? "active"
                : ""
            }`}
          >
            Todos
          </button>

          <button
            onClick={() =>
              setFiltroStatus("livre")
            }
            className={`filter-btn ${
              filtroStatus === "livre"
                ? "active"
                : ""
            }`}
          >
            Livres
          </button>

          <button
            onClick={() =>
              setFiltroStatus("em_uso")
            }
            className={`filter-btn ${
              filtroStatus === "em_uso"
                ? "active"
                : ""
            }`}
          >
            Em Uso
          </button>

          <button
            onClick={() =>
              setFiltroStatus(
                "manutencao"
              )
            }
            className={`filter-btn ${
              filtroStatus ===
              "manutencao"
                ? "active"
                : ""
            }`}
          >
            Manutenção
          </button>
        </div>
      </div>

      <div className="pcs-grid">
        {pcsFiltrados.map((pc) => (
          <div
            key={pc.id}
            className={`pc-card ${pc.status}`}
          >
            <div className="pc-header">
              <h3 className="pc-title">
                {pc.nome}
              </h3>

              <span
                className={`badge ${pc.status}`}
              >
                {pc.status.replace("_", " ")}
              </span>
            </div>

            <div className="pc-body">
              <p className="pc-specs">
                💻 {pc.especificacoes}
              </p>

              {pc.status === "em_uso" ? (
                <>
                  <p className="pc-client">
                    <strong>Cliente:</strong>{" "}
                    {pc.cliente}
                  </p>

                  <p className="pc-time">
                    ⏰{" "}
                    {formatarTempo(
                      pc.tempoRestante
                    )}
                  </p>
                </>
              ) : pc.status ===
                "manutencao" ? (
                <p className="pc-warning">
                  ⚠️ Em manutenção
                </p>
              ) : (
                <p className="pc-available">
                  🟢 Disponível
                </p>
              )}
            </div>

            <div className="pc-actions">
              <button
                onClick={() =>
                  abrirEdicao(pc)
                }
                className="btn-action btn-edit"
              >
                {pc.status === "livre"
                  ? "Adicionar Cliente"
                  : "Modificar"}
              </button>

              {pc.status ===
                "em_uso" && (
                <button
                  onClick={() =>
                    encerrarSessao(pc.id)
                  }
                  className="btn-action btn-release"
                >
                  Liberar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalAberto && pcEmEdicao && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {pcEmEdicao.nome}
            </h3>

            <form
              onSubmit={salvarModificacoes}
            >
              <label>Cliente</label>

              <input
                type="text"
                value={
                  pcEmEdicao.cliente || ""
                }
                onChange={(e) =>
                  setPcEmEdicao({
                    ...pcEmEdicao,
                    cliente:
                      e.target.value,
                  })
                }
                required
              />

              <label>
                Tempo (minutos)
              </label>

              <input
                type="number"
                value={
                  pcEmEdicao.tempoRestante ||
                  ""
                }
                onChange={(e) =>
                  setPcEmEdicao({
                    ...pcEmEdicao,
                    tempoRestante:
                      parseInt(
                        e.target.value
                      ) || 0,
                  })
                }
                required
              />

              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() =>
                    setModalAberto(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-save"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Computadores;