const form = document.getElementById('reservaForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const entradaData = document.getElementById('entradaData').value;
    const entradaHora = document.getElementById('entradaHora').value;
    const saidaData = document.getElementById('saidaData').value;
    const saidaHora = document.getElementById('saidaHora').value;

    if (!entradaData || !entradaHora || !saidaData || !saidaHora) {
        mensagem.textContent = 'Preencha todos os campos.';
        mensagem.classList.add('erro');
        return;
    }

    const entrada = new Date(`${entradaData}T${entradaHora}`);
    const saida = new Date(`${saidaData}T${saidaHora}`);

    if (saida <= entrada) {
        mensagem.textContent = 'A saída deve ser posterior à entrada.';
        mensagem.classList.add('erro');
        return;
    }

    mensagem.classList.remove('erro');
    mensagem.textContent = `Reserva confirmada! 
      Entrada: ${entrada.toLocaleString('pt-BR')} 
      | Saída: ${saida.toLocaleString('pt-BR')}`;
    mensagem.classList.add('sucesso');
});