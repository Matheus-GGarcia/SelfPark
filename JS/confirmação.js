// JS/confirmação.js
document.addEventListener("DOMContentLoaded", () => {
  function getParams() {
    const url = new URL(window.location.href);
    const p = {};
    url.searchParams.forEach((v,k) => { p[k] = v; });
    return p;
  }

  function formatDateTime(iso) {
    if(!iso) return {date:'--/--/----', time: '--:--'};
    const d = new Date(iso);
    if(isNaN(d)) return {date:'--/--/----', time: '--:--'};
    return {
      date: d.toLocaleDateString('pt-BR'),
      time: d.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit', hour12:false})
    };
  }

  const params = getParams();

  const nomeEl = document.getElementById('nomeEvento');
  const localIdDisplay = document.getElementById('localIdDisplay');
  const dataEntrada = document.getElementById('dataEntrada');
  const horaEntrada = document.getElementById('horaEntrada');
  const dataSaida = document.getElementById('dataSaida');
  const horaSaida = document.getElementById('horaSaida');
  const duracaoReserva = document.getElementById('duracaoReserva');
  const valorFinalEls = document.querySelectorAll('[id="valorFinal"]'); // there are two in the template
  const diasFinal = document.getElementById('diasFinal');

  // Title & Local
  if(params.title) {
    const decodedTitle = decodeURIComponent(params.title);
    if(nomeEl) nomeEl.textContent = decodedTitle;
  } else if (params.eventId) {
    if(nomeEl) nomeEl.textContent = `Evento • ID ${params.eventId}`;
  } else {
    if(nomeEl) nomeEl.textContent = 'Reserva';
  }

  if(localIdDisplay) localIdDisplay.textContent = params.localId || '--';

  // Dates
  const ent = formatDateTime(params.entrada);
  const sai = formatDateTime(params.saida);
  if(dataEntrada) dataEntrada.textContent = ent.date;
  if(horaEntrada) horaEntrada.textContent = ent.time;
  if(dataSaida) dataSaida.textContent = sai.date;
  if(horaSaida) horaSaida.textContent = sai.time;

  // Duration (days/hours)
  let durationText = '--';
  if(params.entrada && params.saida){
    const d1 = new Date(params.entrada);
    const d2 = new Date(params.saida);
    if(!isNaN(d1) && !isNaN(d2)){
      const diffMs = Math.max(0, d2 - d1);
      const diffDays = Math.floor(diffMs / (24*60*60*1000));
      const diffHours = Math.floor((diffMs % (24*60*60*1000)) / (60*60*1000));
      durationText = `${diffDays}d ${diffHours}h`;
    }
  }
  if(duracaoReserva) duracaoReserva.textContent = durationText;
  if(diasFinal) diasFinal.textContent = params.dias ? `${params.dias} dias` : '--';

  // Total
  const totalText = params.total ? `R$ ${Number(params.total).toLocaleString('pt-BR',{minimumFractionDigits:2})}` : 'R$ --,--';
  valorFinalEls.forEach(el => el.textContent = totalText);

  // Tipo de vaga
  const tipoVaga = params.tipoVaga || 'Normal';
  // You might want to display tipoVaga somewhere; template doesn't have dedicated element
  // We'll append it to evento-local paragraph if present
  const eventoLocalP = document.querySelector('.evento-local');
  if(eventoLocalP) {
    // append a small badge
    const span = document.createElement('span');
    span.style.marginLeft = '8px';
    span.style.fontWeight = '600';
    span.style.color = '#9ea7b4';
    span.textContent = `• Vaga: ${tipoVaga}`;
    eventoLocalP.appendChild(span);
  }

  // Reservation code (generate simple code)
  function generateCode(){
    const a = Math.random().toString(36).substring(2,7).toUpperCase();
    const b = Math.floor(Math.random() * 9000) + 1000;
    return `${a}-${b}`;
  }
  const code = generateCode();
  // show toast with code (or inject somewhere)
  const toast = document.getElementById('toast');
  if(toast){
    toast.textContent = `Reserva confirmada — código #${code}`;
    // show briefly
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 5000);
  }

});
