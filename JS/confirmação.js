document.addEventListener('DOMContentLoaded', () => {
    // 2. Mapeamento de Eventos para simular a busca
    const eventMap = new Map([
        ['1234', 'Vozes Negras'],
        ['1235', 'Palmeiras x Santos'],
        ['1236', 'Moyses Rico e Iara Bicalho'],
        ['1237', 'Peça Teatral'],
        ['1238', 'Exposição de Arte']
        // Adicione outros eventId conforme necessário
    ]);

    // 1. Extração de Dados da URL
    const urlParams = new URLSearchParams(window.location.search);
    const entradaISO = urlParams.get('entrada'); // Ex: 2025-11-25T16:30:00Z
    const saidaISO = urlParams.get('saida');     // Ex: 2025-11-26T02:59:00Z
    const eventId = urlParams.get('eventId');
    const localId = urlParams.get('localId'); // Usado apenas para exibição

    // Elementos do DOM
    const nomeEventoEl = document.getElementById('nomeEvento');
    const localIdDisplayEl = document.getElementById('localIdDisplay');
    const dataEntradaEl = document.getElementById('dataEntrada');
    const horaEntradaEl = document.getElementById('horaEntrada');
    const dataSaidaEl = document.getElementById('dataSaida');
    const horaSaidaEl = document.getElementById('horaSaida');
    const duracaoReservaEl = document.getElementById('duracaoReserva');

    if (eventId) {
        // 2. Preenchimento do Nome do Evento
        const nomeDoEvento = eventMap.get(eventId) || 'Evento Desconhecido';
        nomeEventoEl.textContent = nomeDoEvento;
    }

    if (localId) {
        localIdDisplayEl.textContent = localId;
    }

    if (entradaISO && saidaISO) {
        const dataEntrada = new Date(entradaISO);
        const dataSaida = new Date(saidaISO);

        // Função de formatação para DD/MM/AAAA HH:MM
        const formatarDataHora = (data) => {
            // Garante que o UTC seja convertido para a hora local do navegador 
            // e formatado para o padrão brasileiro
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            const horas = String(data.getHours()).padStart(2, '0');
            const minutos = String(data.getMinutes()).padStart(2, '0');
            
            return {
                data: `${dia}/${mes}/${ano}`,
                hora: `${horas}:${minutos}`
            };
        };

        // 1. Formato de Data/Hora (Padrão Brasileiro)
        const entradaFormatada = formatarDataHora(dataEntrada);
        const saidaFormatada = formatarDataHora(dataSaida);

        dataEntradaEl.textContent = entradaFormatada.data;
        horaEntradaEl.textContent = entradaFormatada.hora;
        dataSaidaEl.textContent = saidaFormatada.data;
        horaSaidaEl.textContent = saidaFormatada.hora;

        // 1. Cálculo da Duração
        const diffMs = dataSaida.getTime() - dataEntrada.getTime();
        
        if (diffMs > 0) {
            const diffMin = Math.round(diffMs / (1000 * 60)); // Diferença total em minutos
            const horas = Math.floor(diffMin / 60);
            const minutos = diffMin % 60;
            
            duracaoReservaEl.textContent = `${horas}h ${String(minutos).padStart(2, '0')}m`;
        } else {
            duracaoReservaEl.textContent = 'Tempo Inválido';
        }
    } else {
        // Tratar caso de URL incompleta
        console.error('Parâmetros de entrada ou saída ausentes na URL.');
        nomeEventoEl.textContent = 'Erro ao carregar detalhes da reserva.';
        duracaoReservaEl.textContent = '--h --m';
    }
});


