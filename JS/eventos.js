document.addEventListener("DOMContentLoaded", () => {

  const realEvents = document.querySelector(".real-events");
  const skeleton = document.querySelector(".skeleton-wrapper");
  const cards = [...document.querySelectorAll(".real-events .card")];

  const cidadeSel = document.getElementById("cidade");
  const tipoSel = document.getElementById("tipo");
  const dataSel = document.getElementById("data");
  const noResults = document.getElementById("noResults");
  const cardsContainer = document.getElementById("cardsContainer");

  /* =====================================================
     ⚪ REMOVER SKELETON GRADUALMENTE
  ===================================================== */
  setTimeout(() => {
    skeleton.classList.add("hidden");
    realEvents.classList.remove("hidden");
  }, 1200);


  /* =====================================================
     🟦 FUNÇÃO DE FILTRO
  ===================================================== */
  function applyFilters() {

    // animação sutil ao atualizar
    cardsContainer.classList.add("filtering");

    setTimeout(() => cardsContainer.classList.remove("filtering"), 300);

    const cidade = cidadeSel.value;
    const tipo = tipoSel.value;
    const data = dataSel.value ? new Date(dataSel.value + "T00:00") : null;

    let visible = 0;

    cards.forEach(card => {

      const eventCity = card.dataset.city;
      const eventType = card.dataset.type;

      const start = new Date(card.dataset.start + "T00:00");
      const end = new Date(card.dataset.end + "T23:59");

      let show = true;

      if (cidade && cidade !== eventCity) show = false;
      if (tipo && tipo !== eventType) show = false;
      if (data && !(data >= start && data <= end)) show = false;

      card.classList.toggle("hidden", !show);

      if (show) visible++;
    });

    noResults.classList.toggle("hidden", visible !== 0);
  }


  /* INPUT EM TEMPO REAL */
  [cidadeSel, tipoSel, dataSel].forEach(el =>
    el.addEventListener("input", applyFilters)
  );


  /* =====================================================
     ❤️ FAVORITAR EVENTO
  ===================================================== */
  document.addEventListener("click", e => {
    const btn = e.target.closest(".favorite-btn");
    if (btn) btn.classList.toggle("active");
  });


  /* =====================================================
     🔗 REDIRECIONAR QUANDO CLICAR NO CARD
  ===================================================== */
  cards.forEach(card => {
    card.addEventListener("click", e => {

      // botão de favorito não redireciona
      if (e.target.closest(".favorite-btn")) return;

      e.preventDefault();
      window.location.href =
        `${card.href}?eventId=${card.dataset.eventId}&localId=${card.dataset.localId}`;
    });
  });

});
