document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Funções Utilitárias
  // -------------------------------

  function safeDecode(v) {
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  }

  function getParams() {
    const url = new URL(window.location.href);
    const p = {};
    url.searchParams.forEach((v, k) => {
      p[k] = safeDecode(v);
    });
    return p;
  }

  function formatDateTime(iso) {
    if (!iso) return { date: '--/--/----', time: '--:--' };

    const d = new Date(iso);
    if (isNaN(d.getTime())) return { date: '--/--/----', time: '--:--' };

    return {
      date: d.toLocaleDateString('pt-BR'),
      time: d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
  }

  function formatMoney(v) {
    if (!v) return 'R$ --,--';

    let num = Number(
      String(v)
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')
        .trim()
    );

    if (isNaN(num)) return 'R$ --,--';

    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // -------------------------------
  // Carregar parâmetros
  // -------------------------------

  const params = getParams();

  // -------------------------------
  // Captura dos elementos
  // -------------------------------

  const nomeEl = document.getElementById('nomeEvento');
  const localIdDisplay = document.getElementById('localIdDisplay');

  const dataEntrada = document.getElementById('dataEntrada');
  const horaEntrada = document.getElementById('horaEntrada');
  const dataSaida = document.getElementById('dataSaida');
  const horaSaida = document.getElementById('horaSaida');

  const duracaoReserva = document.getElementById('duracaoReserva');
  const valorFinal1 = document.getElementById('valorFinal1');
  const valorFinal2 = document.getElementById('valorFinal2');
  const diasFinal = document.getElementById('diasFinal');

  // -------------------------------
  // Nome do Evento
  // -------------------------------

  if (params.title) {
    nomeEl.textContent = params.title;
  } else if (params.eventId) {
    nomeEl.textContent = `Evento • ID ${params.eventId}`;
  } else {
    nomeEl.textContent = 'Reserva';
  }

  // -------------------------------
  // Local
  // -------------------------------

  localIdDisplay.textContent = params.localId || '--';

  // -------------------------------
  // Datas Formatadas
  // -------------------------------

  const entradaFmt = formatDateTime(params.entrada);
  const saidaFmt = formatDateTime(params.saida);

  dataEntrada.textContent = entradaFmt.date;
  horaEntrada.textContent = entradaFmt.time;

  dataSaida.textContent = saidaFmt.date;
  horaSaida.textContent = saidaFmt.time;

  // -------------------------------
  // Cálculo de duração (dias + horas)
  // -------------------------------

  let durText = '--h --m';

  if (params.entrada && params.saida) {
    const d1 = new Date(params.entrada);
    const d2 = new Date(params.saida);

    if (!isNaN(d1) && !isNaN(d2)) {
      const diffMs = Math.max(0, d2 - d1);

      const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
      const diffHours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

      durText = `${diffDays}d ${diffHours}h`;
    }
  }

  duracaoReserva.textContent = durText;

  // -------------------------------
  // Dias (enviado pelo ex.js)
  // -------------------------------

  diasFinal.textContent = params.dias ? `${params.dias} dias` : '-- dias';

  // -------------------------------
  // Valores (prioridade: parâmetros → localStorage)
  // -------------------------------

  const subtotal = params.subtotal || localStorage.getItem('reserva_subtotal') || '0,00';
  const total = params.total || localStorage.getItem('reserva_total') || '0,00';

  valorFinal1.textContent = formatMoney(subtotal);
  valorFinal2.textContent = formatMoney(total);

  // -------------------------------
  // Tipo de Vaga (acessório)
  // -------------------------------

  const tipoVaga = params.tipoVaga || 'Normal';
  const eventoLocalP = document.querySelector('.evento-local');

  if (eventoLocalP) {
    const span = document.createElement('span');
    span.style.marginLeft = '8px';
    span.style.fontWeight = '600';
    span.style.color = '#9ea7b4';
    span.textContent = `• Vaga: ${tipoVaga}`;
    eventoLocalP.appendChild(span);
  }

  // -------------------------------
  // Código da Reserva (estético / toast)
  // -------------------------------

  function generateCode() {
    const a = Math.random().toString(36).substring(2, 7).toUpperCase();
    const b = Math.floor(Math.random() * 9000) + 1000;
    return `${a}-${b}`;
  }

  const code = generateCode();
  const toast = document.getElementById('toast');

  if (toast) {
    toast.textContent = `Reserva confirmada — código #${code}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

});
