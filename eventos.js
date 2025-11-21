// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filterForm');
  const clearBtn = document.getElementById('clearBtn');
  const cards = Array.from(document.querySelectorAll('#eventsGrid .card'));
  const cidadeSel = document.getElementById('cidade');
  const tipoSel = document.getElementById('tipo');
  const dateInput = document.getElementById('data');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');

  function formatCount(n) {
    return `${n} resultado${n !== 1 ? 's' : ''}`;
  }

  function applyFilters(e) {
    if (e) e.preventDefault();

    const cidade = cidadeSel.value;      // 'sp' | 'rj' | 'bh' | 'cur' | ''
    const tipo = tipoSel.value;          // 'show' | 'esporte' | ...
    const dateValue = dateInput.value;   // 'YYYY-MM-DD' or ''

    const filterDate = dateValue ? new Date(dateValue + 'T00:00:00') : null;

    let visibleCount = 0;

    cards.forEach(card => {
      const cardCity = card.dataset.city || '';
      const cardType = card.dataset.type || '';
      const start = card.dataset.start || '';
      const end = card.dataset.end || '';

      const startDate = start ? new Date(start + 'T00:00:00') : null;
      const endDate = end ? new Date(end + 'T23:59:59') : null;

      let visible = true;

      if (cidade && cidade !== cardCity) visible = false;
      if (tipo && tipo !== cardType) visible = false;

      if (filterDate) {
        if (startDate && endDate) {
          if (!(filterDate >= startDate && filterDate <= endDate)) visible = false;
        } else {
          visible = false;
        }
      }

      if (visible) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    // Atualiza contador e mensagem
    resultsCount.textContent = formatCount(visibleCount);
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  clearBtn.addEventListener('click', () => {
    cidadeSel.value = '';
    tipoSel.value = '';
    dateInput.value = '';
    applyFilters();
  });

  form.addEventListener('submit', applyFilters);
  [cidadeSel, tipoSel, dateInput].forEach(el => el.addEventListener('change', applyFilters));

  // aplica no carregamento
  applyFilters();


  // ... (código existente da função applyFilters) ...

  // Novo: Adiciona Listener para construir o link com eventId e localId
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault(); // Impede o link padrão

      const eventId = card.dataset.eventId;
      const localId = card.dataset.localId;
      const destino = card.getAttribute('href'); // datetime.html

      if (eventId && localId && destino) {
        // Redireciona para datetime.html passando os IDs
        window.location.href = `${destino}?eventId=${eventId}&localId=${localId}`;
      } else {
        // Volta para o comportamento padrão se faltarem dados (opcional)
        window.location.href = destino; 
      }
    });
  });

  // aplica no carregamento
  applyFilters();
});

