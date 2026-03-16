import { useState } from 'react';

function FormTarefa({ adicionarTarefa }) {
    const [texto, setTexto] = useState('');
    const [cor, setCor] = useState('#6f008b');

    const enviar = (e) => {
        e.preventDefault();
        if (!texto.trim()) return;
        adicionarTarefa(texto, cor);
        setTexto('');
    };

    return (
        <form onSubmit={enviar} className="form-tarefa">
            <input 
                type="text" 
                placeholder="O que precisa ser feito?" 
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <input 
                type="color" 
                value={cor} 
                onChange={(e) => setCor(e.target.value)} 
                title="Escolha uma cor para a tarefa"
            />
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default FormTarefa;