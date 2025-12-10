const form = document.getElementById('reservaForm');
const mensagem = document.getElementById('mensagem');

// --- Configuração de Preço (Igual ao ex.html) ---
const basePrice = 160.00; 

// 1. Extração de IDs da URL atual
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId') || '1234';
const localId = urlParams.get('localId') || '32';

console.log(`IDs de Evento e Local: EventID=${eventId}, LocalID=${localId}`);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpa mensagem de erro
    mensagem.textContent = '';
    mensagem.className = 'mensagem';

    // Coleta de Dados do Formulário
    const entradaData = document.getElementById('entradaData').value;
    const entradaHora = document.getElementById('entradaHora').value;
    const saidaData = document.getElementById('saidaData').value;
    const saidaHora = document.getElementById('saidaHora').value;

    // VALIDAÇÃO 1: Campos Preenchidos
    if (!entradaData || !entradaHora || !saidaData || !saidaHora) {
        mensagem.textContent = 'Preencha todos os campos de data e hora.';
        mensagem.classList.add('erro');
        return;
    }

    // Criação de datas para validação e envio (ISO)
    const entradaStrLocal = `${entradaData}T${entradaHora}:00`;
    const saidaStrLocal = `${saidaData}T${saidaHora}:00`;

    const entrada = new Date(entradaStrLocal);
    const saida = new Date(saidaStrLocal);

    // VALIDAÇÃO 2: Datas válidas
    if (isNaN(entrada.getTime()) || isNaN(saida.getTime())) {
        mensagem.textContent = 'Erro ao processar a data. Verifique o formato.';
        mensagem.classList.add('erro');
        return;
    }

    // VALIDAÇÃO 3: Lógica temporal
    if (saida <= entrada) {
        mensagem.textContent = 'A data/hora de Saída deve ser posterior à de Entrada.';
        mensagem.classList.add('erro');
        return;
    }

    // --- CÁLCULO DE PREÇO E DIAS (Lógica do ex.html) ---
    // A lógica define o dia com base no meio-dia para evitar problemas de fuso/horário de verão no cálculo de diárias
    const msPerDay = 24 * 60 * 60 * 1000;
    
    // Cria cópias das datas ajustadas para meio-dia (12:00) para cálculo de diárias cheias
    const startNoon = new Date(entrada); 
    startNoon.setHours(12, 0, 0, 0);
    
    const endNoon = new Date(saida); 
    endNoon.setHours(12, 0, 0, 0);

    // Calcula a diferença em dias + 1 (mínimo 1 dia)
    let diasCalc = Math.ceil((endNoon - startNoon) / msPerDay) + 1;
    if (diasCalc < 1) diasCalc = 1;

    // Calcula o total (Preço Base * Dias)
    // Nota: Como este formulário não tem input de cupom, usamos apenas o preço base.
    const totalCalc = basePrice * diasCalc;

    // --- PREPARAÇÃO PARA ENVIO ---
    const entradaISO = entrada.toISOString();
    const saidaISO = saida.toISOString();

    const params = new URLSearchParams();
    params.append('eventId', eventId);
    params.append('localId', localId);
    params.append('entrada', entradaISO);
    params.append('saida', saidaISO);
    
    // 🔵 Novos parâmetros adicionados para a confirmação
    params.append('total', totalCalc.toFixed(2));
    params.append('dias', diasCalc);

    // URL de destino (Corrigido para sem caracteres especiais se necessário)
    const redirectUrl = `ex.html?${params.toString()}`;

    console.log('Dados da Reserva:', {
        entrada: entradaISO,
        saida: saidaISO,
        dias: diasCalc,
        total: totalCalc
    });

    // Redirecionamento
    window.location.href = redirectUrl;
});