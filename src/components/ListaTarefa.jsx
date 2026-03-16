import Tarefa from "./Tarefa";

function ListaTarefa({ tarefas, excluir, alternar, editar }) {

  return (
    <div className="lista-tarefas">

      {tarefas.length === 0 && (
        <p>Nenhuma tarefa encontrada.</p>
      )}

      {tarefas.map((tarefa) => (
        <Tarefa
          key={tarefa.id}
          tarefa={tarefa}
          excluir={excluir}
          alternar={alternar}
          editar={editar}
        />
      ))}

    </div>
  );
}

export default ListaTarefa;