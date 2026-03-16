import { useState, useEffect } from "react";
import FormTarefa from "./components/FormTarefa";
import ListaTarefa from "./components/ListaTarefa";

function App() {
  // guarda todas as tarefas
  const [tarefas, setTarefas] = useState([]);

  // guarda qual filtro está selecionado
  const [filtro, setFiltro] = useState("todas");


  // Quando o app inicia, carrega tarefas salvas no localStorage
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("minhas_tarefas");

    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);


  // Sempre que as tarefas mudarem, salva no localStorage
  useEffect(() => {
    localStorage.setItem("minhas_tarefas", JSON.stringify(tarefas));
  }, [tarefas]);


  // Função para adicionar uma nova tarefa
  function adicionarTarefa(texto, cor) {
    const novaTarefa = {
      id: Date.now(), // cria um id baseado no tempo
      texto: texto,
      cor: cor,
      completada: false
    };

    setTarefas([...tarefas, novaTarefa]);
  }


  // Função para excluir
  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  }


  // Função para marcar ou desmarcar tarefa como concluída
  function alternarConclusao(id) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, completada: !tarefa.completada };
      } else {
        return tarefa;
      }
    });

    setTarefas(novasTarefas);
  }

  // Função editar
  function editarTarefa(id, novoTexto) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, texto: novoTexto };
      }
      return tarefa;
    });

    setTarefas(novasTarefas);
  }


  // Aplicar filtro nas tarefas
  const tarefasExibidas = tarefas.filter((tarefa) => {
    if (filtro === "completas") {
      return tarefa.completada;
    }

    if (filtro === "pendentes") {
      return !tarefa.completada;
    }

    return true; // mostra todas
  });


  return (
    <div className="app-container">

      <h1>Minhas Tarefas</h1>

      {/* Formulário para adicionar tarefa */}
      <FormTarefa adicionarTarefa={adicionarTarefa} />

      <p>Clique duas vezes para editar sua tarefa</p>
      <div className="controles">

        {/* Botões de filtro */}
        <div className="filtros">
          <button onClick={() => setFiltro("todas")}>Todas</button>
          <button onClick={() => setFiltro("pendentes")}>Pendentes</button>
          <button onClick={() => setFiltro("completas")}>Completas</button>
        </div>

        {/* Contador de tarefas pendentes */}
        <p className="contador">
          Tarefas pendentes:{" "}
          <strong>
            {tarefas.filter((tarefa) => !tarefa.completada).length}
          </strong>
        </p>

      </div>

      {/* Lista de tarefas */}
      <ListaTarefa 
        tarefas={tarefasExibidas}
        excluir={excluirTarefa}
        alternar={alternarConclusao}
        editar={editarTarefa}
      />

    </div>
  );
}

export default App;