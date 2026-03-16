import { useState } from "react";

function Tarefa({ tarefa, excluir, alternar, editar }) {

  const [editando, setEditando] = useState(false);
  const [novoTexto, setNovoTexto] = useState(tarefa.texto);

  const salvar = () => {
    editar(tarefa.id, novoTexto);
    setEditando(false);
  };

  return (
    <div
      className={`tarefa-card ${tarefa.completada ? 'concluida' : ''}`}
      style={{ borderLeft: `8px solid ${tarefa.cor}` }}
    >

      {editando ? (
        <input
          value={novoTexto}
          onChange={(e) => setNovoTexto(e.target.value)}
          onBlur={salvar}
          autoFocus
        />
      ) : (
        <div 
          className="tarefa-texto"
          onClick={() => alternar(tarefa.id)}
          onDoubleClick={() => setEditando(true)}
        >
          {tarefa.texto}
        </div>
      )}

      <button className="btn-excluir" onClick={() => excluir(tarefa.id)}>
        &times;
      </button>

    </div>
  );
}

export default Tarefa;