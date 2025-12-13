(function () {
  'use strict';

  /* =====================================================
     LEITURA DOS DADOS (URL + localStorage)
  ===================================================== */

  const params = new URLSearchParams(window.location.search);

  const evento = {
    title:
      params.get('title') ||
      localStorage.getItem('reserva_title') ||
      'Reserva',

    total:
      params.get('total') ||
      localStorage.getItem('reserva_total') ||
      '0,00',

    entrada:
      params.get('entrada') ||
      localStorage.getItem('reserva_entrada'),

    saida:
      params.get('saida') ||
      localStorage.getItem('reserva_saida')
  };

  /* =====================================================
     UTILITÁRIOS
  ===================================================== */

  function formatMoney(v) {
    let num = Number(
      String(v)
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim()
    );

    if (isNaN(num)) return 'R$ --,--';

    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function calcularTempo(entrada, saida) {
    if (!entrada || !saida) return '--';

    const d1 = new Date(entrada);
    const d2 = new Date(saida);

    if (isNaN(d1) || isNaN(d2)) return '--';

    const diffMs = Math.max(0, d2 - d1);

    const dias = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const horas = Math.floor(
      (diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );

    return `${dias}d ${horas}h`;
  }

  function gerarPayloadReserva() {
    return JSON.stringify({
      id: 'RES-' + Date.now(),
      evento: evento.title,
      total: evento.total,
      entrada: evento.entrada,
      saida: evento.saida
    });
  }

  /* =====================================================
     ELEMENTOS (RESUMO)
  ===================================================== */

  const nomeEl     = document.getElementById('eventoNome');
  const tempoEl    = document.getElementById('eventoTempo');
  const totalEl    = document.getElementById('eventoTotal');
  const totalBigEl = document.getElementById('eventoTotalBig');
  const btnPagar   = document.getElementById('btnPagar');

  /* =====================================================
     POPULA RESUMO
  ===================================================== */

  if (nomeEl) nomeEl.textContent = evento.title;
  if (tempoEl) tempoEl.textContent = calcularTempo(evento.entrada, evento.saida);

  const totalFormatado = formatMoney(evento.total);

  if (totalEl) totalEl.textContent = totalFormatado;
  if (totalBigEl) totalBigEl.textContent = totalFormatado;

  if (btnPagar && !btnPagar.dataset.locked) {
    btnPagar.textContent = `Pagar ${totalFormatado}`;
    btnPagar.dataset.locked = 'true';
  }

  /* =====================================================
     MÉTODOS DE PAGAMENTO (NÃO SOBRESCREVE)
  ===================================================== */

  if (!window.switchTab) {
    window.switchTab = function (method) {
      document.querySelectorAll('.method-card')
        .forEach(el => el.classList.remove('active'));

      document.querySelectorAll('.tab-content')
        .forEach(el => el.classList.remove('active'));

      if (method === 'credit' || method === 'debit') {
        document
          .querySelector(`[onclick="switchTab('${method}')"]`)
          ?.classList.add('active');

        document.getElementById('card-form')
          ?.classList.add('active');
      } else {
        document
          .querySelector(`[onclick="switchTab('pix')"]`)
          ?.classList.add('active');

        document.getElementById('pix-content')
          ?.classList.add('active');
      }
    };
  }

  /* =====================================================
     CARTÃO DE CRÉDITO (INALTERADO)
  ===================================================== */

  const cardNumber = document.getElementById('input-number');
  const cardHolder = document.getElementById('input-holder');
  const cardExpiry = document.getElementById('input-expiry');
  const cardCvv    = document.getElementById('input-cvv');

  const displayNumber = document.getElementById('card-number-display');
  const displayHolder = document.getElementById('card-holder-display');
  const displayExpiry = document.getElementById('card-expiry-display');
  const displayCvv    = document.getElementById('card-cvv-display');

  const visualCard = document.getElementById('visual-card');
  const iconFront  = document.getElementById('card-icon-front');
  const iconBack   = document.getElementById('card-icon-back');

  function updateCardBrand(number) {
    const clean = number.replace(/\D/g, '');

    iconFront.className = '';
    iconBack.className  = '';

    if (/^4/.test(clean)) {
      iconFront.className = iconBack.className = 'fab fa-cc-visa';
      return;
    }

    if (/^(5[1-5]|2[2-7])/.test(clean)) {
      iconFront.className = iconBack.className = 'fab fa-cc-mastercard';
      return;
    }

    iconFront.className = iconBack.className = 'fas fa-credit-card';
  }

  if (cardNumber) {
    cardNumber.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      updateCardBrand(v);
      v = v.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = v;
      displayNumber.textContent = v || '#### #### #### ####';
    });
  }

  if (cardHolder) {
    cardHolder.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/[0-9]/g, '');
      displayHolder.textContent =
        e.target.value.toUpperCase() || 'SEU NOME AQUI';
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
      e.target.value = v;
      displayExpiry.textContent = v || 'MM/AA';
    });
  }

  if (cardCvv) {
    cardCvv.addEventListener('focus', () =>
      visualCard?.classList.add('flipped')
    );
    cardCvv.addEventListener('blur', () =>
      visualCard?.classList.remove('flipped')
    );
    cardCvv.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '');
      displayCvv.textContent = e.target.value || '***';
    });
  }

  /* =====================================================
     MODAL + QR CODE + PDF
  ===================================================== */

  function atualizarQRCode() {
    const payload = encodeURIComponent(gerarPayloadReserva());
    const qrUrl =
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${payload}`;

    const qrImg = document.getElementById('qrReserva');
    if (qrImg) qrImg.src = qrUrl;

    return qrUrl;
  }

  function abrirModalConfirmacao() {
    atualizarQRCode();
    document.getElementById('modalConfirmacao')
      ?.classList.add('active');
  }

  function fecharModalConfirmacao() {
    document.getElementById('modalConfirmacao')
      ?.classList.remove('active');
  }

  function gerarPDFQRCode() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const qrImg = document.getElementById('qrReserva');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = qrImg.src;

    img.onload = function () {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Confirmação de Reserva', 105, 25, { align: 'center' });

      doc.line(20, 32, 190, 32);

      doc.addImage(img, 'PNG', 55, 40, 100, 100);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Apresente este QR Code para validar sua reserva.',
        105,
        150,
        { align: 'center' }
      );

      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        'Documento gerado digitalmente.',
        105,
        160,
        { align: 'center' }
      );

      doc.save('reserva-qrcode.pdf');
    };
  }

  /* =====================================================
     DISPAROS
  ===================================================== */

  btnPagar?.addEventListener('click', abrirModalConfirmacao);

  document
    .querySelector('#pix-content .btn-confirm')
    ?.addEventListener('click', abrirModalConfirmacao);

  document
    .getElementById('btnDownloadPDF')
    ?.addEventListener('click', function (e) {
      e.preventDefault();
      gerarPDFQRCode();
    });

  document
    .getElementById('fecharModal')
    ?.addEventListener('click', fecharModalConfirmacao);

})();


/* =====================================================
   FECHAR MODAL (CORREÇÃO DEFINITIVA)
===================================================== */

function fecharModalConfirmacao() {
  const modal = document.getElementById('modalConfirmacao');
  if (!modal) return;

  modal.classList.remove('active');
}

/* Botão X */
document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'fecharModal') {
    e.preventDefault();
    fecharModalConfirmacao();
  }
});

/* Clique fora da caixa fecha a modal */
document.addEventListener('click', function (e) {
  const modal = document.getElementById('modalConfirmacao');
  const box = modal?.querySelector('.modal-box');

  if (
    modal?.classList.contains('active') &&
    e.target === modal
  ) {
    fecharModalConfirmacao();
  }
});

