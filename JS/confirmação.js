document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       🔵 1. Mapeamento de Eventos
    ============================================================ */
    const eventMap = new Map([
        ['1234', 'Vozes Negras'],
        ['1235', 'Palmeiras x Santos'],
        ['1236', 'Moyses Rico e Iara Bicalho'],
        ['1237', 'Peça Teatral'],
        ['1238', 'Exposição de Arte']
    ]);

    /* ============================================================
       🟡 2. Dados da URL
    ============================================================ */
    const urlParams = new URLSearchParams(window.location.search);

    const entradaISO = urlParams.get("entrada");
    const saidaISO   = urlParams.get("saida");
    const eventId    = urlParams.get("eventId");
    const localId    = urlParams.get("localId");

    // ➕ Campos novos
    const total = urlParams.get("total");
    const dias  = urlParams.get("dias");

    /* ============================================================
       🔴 3. Elementos do DOM
    ============================================================ */
    const nomeEventoEl     = document.getElementById('nomeEvento');
    const localIdDisplayEl = document.getElementById('localIdDisplay');
    const dataEntradaEl    = document.getElementById('dataEntrada');
    const horaEntradaEl    = document.getElementById('horaEntrada');
    const dataSaidaEl      = document.getElementById('dataSaida');
    const horaSaidaEl      = document.getElementById('horaSaida');
    const duracaoReservaEl = document.getElementById('duracaoReserva');

    const valorFinalEl     = document.getElementById("valorFinal");
    const diasFinalEl      = document.getElementById("diasFinal");

    /* ============================================================
       🟢 4. Nome do Evento + Local
    ============================================================ */
    if (eventId) {
        const nomeDoEvento = eventMap.get(eventId) || "Evento Desconhecido";
        nomeEventoEl.textContent = nomeDoEvento;
    }

    if (localId) {
        localIdDisplayEl.textContent = localId;
    }

    /* ============================================================
       🟣 5. Datas / Horários / Duração
    ============================================================ */
    if (entradaISO && saidaISO) {

        const dataEntrada = new Date(entradaISO);
        const dataSaida   = new Date(saidaISO);

        const formatar = (data) => {
            const dia     = String(data.getDate()).padStart(2, "0");
            const mes     = String(data.getMonth()+1).padStart(2, "0");
            const ano     = data.getFullYear();
            const horas   = String(data.getHours()).padStart(2, "0");
            const minutos = String(data.getMinutes()).padStart(2, "0");
            return {
                data: `${dia}/${mes}/${ano}`,
                hora: `${horas}:${minutos}`
            };
        };

        const entradaFmt = formatar(dataEntrada);
        const saidaFmt   = formatar(dataSaida);

        dataEntradaEl.textContent = entradaFmt.data;
        horaEntradaEl.textContent = entradaFmt.hora;
        dataSaidaEl.textContent   = saidaFmt.data;
        horaSaidaEl.textContent   = saidaFmt.hora;

        // duração
        const diffMs = dataSaida - dataEntrada;

        if (diffMs > 0) {
            const minutosTotais = Math.floor(diffMs / 1000 / 60);
            const horas = Math.floor(minutosTotais / 60);
            const minutos = minutosTotais % 60;
            duracaoReservaEl.textContent = `${horas}h ${String(minutos).padStart(2, "0")}m`;
        } else {
            duracaoReservaEl.textContent = "Tempo Inválido";
        }
    }

    /* ============================================================
       🟠 6. Mostrar Total + Dias
    ============================================================ */

    if (total) {
        valorFinalEl.textContent = `R$ ${Number(total).toFixed(2)}`;
    }

    if (dias) {
        diasFinalEl.textContent = `${dias} dias`;
    }

    /* ============================================================
       🟤 7. LOGS COMPLETOS PARA DEBUG
    ============================================================ */
    console.log({
        eventId,
        localId,
        entradaISO,
        saidaISO,
        total,
        dias
    });

});
