document.addEventListener("DOMContentLoaded", () => {
  const realEvents = document.querySelector(".real-events");
  const skeleton = document.querySelector(".skeleton-wrapper");
  const cardNodeList = document.querySelectorAll(".real-events .card");
  const cards = Array.from(cardNodeList || []);

  const cidadeSel = document.getElementById("cidade");
  const tipoSel = document.getElementById("tipo");
  const dataSel = document.getElementById("data");
  const noResults = document.getElementById("noResults");
  const cardsContainer = document.getElementById("cardsContainer");

  // Se algum elemento essencial estiver ausente, evita lançamentos
  // (apenas loga e continua — assim o site não quebra)
  if (!cardsContainer) console.warn("cardsContainer não encontrado.");
  if (!noResults) console.warn("noResults não encontrado.");

  /* =====================================================
     ⚪ REMOVER SKELETON GRADUALMENTE
  ===================================================== */
  if (skeleton && realEvents) {
    setTimeout(() => {
      skeleton.classList.add("hidden");
      realEvents.classList.remove("hidden");
    }, 1200);
  }

  /* =====================================================
     🟦 FUNÇÃO DE FILTRO
  ===================================================== */
  function applyFilters() {
    if (!cardsContainer) return;

    // animação sutil ao atualizar
    cardsContainer.classList.add("filtering");
    setTimeout(() => cardsContainer.classList.remove("filtering"), 300);

    const cidade = cidadeSel ? cidadeSel.value : "";
    const tipo = tipoSel ? tipoSel.value : "";
    const data = (dataSel && dataSel.value) ? new Date(dataSel.value + "T00:00") : null;

    let visible = 0;

    cards.forEach(card => {
      // se o card não tiver dataset, assume visível
      const eventCity = card.dataset ? card.dataset.city : "";
      const eventType = card.dataset ? card.dataset.type : "";

      // tenta ler start/end do dataset; se não houver, considera sempre no range
      const start = card.dataset && card.dataset.start ? new Date(card.dataset.start + "T00:00") : null;
      const end = card.dataset && card.dataset.end ? new Date(card.dataset.end + "T23:59") : null;

      let show = true;

      if (cidade && cidade !== eventCity) show = false;
      if (tipo && tipo !== eventType) show = false;
      if (data && ( !(start instanceof Date && end instanceof Date) || !(data >= start && data <= end) )) show = false;

      card.classList.toggle("hidden", !show);

      if (show) visible++;
    });

    if (noResults) {
      // mostra noResults somente quando visible === 0
      noResults.classList.toggle("hidden", visible !== 0);
    }
  }

  /* INPUT EM TEMPO REAL (se os selects existem) */
  [cidadeSel, tipoSel, dataSel].forEach(el => {
    if (el) el.addEventListener("input", applyFilters);
  });

  /* =====================================================
     ❤️ FAVORITAR EVENTO
  ===================================================== */
  document.addEventListener("click", e => {
    const btn = e.target.closest ? e.target.closest(".favorite-btn") : null;
    if (btn) btn.classList.toggle("active");
  });

  /* =====================================================
     🔗 REDIRECIONAR QUANDO CLICAR NO CARD
     - envia eventId, localId e, se existir, entrada (yyyy-mm-dd)
  ===================================================== */
  cards.forEach(card => {
    card.addEventListener("click", e => {
      try {
        // botão de favorito não redireciona
        if (e.target.closest && e.target.closest(".favorite-btn")) return;

        // determina URL do card (prioriza data-href)
        const urlFromDataset = card.dataset && card.dataset.href ? card.dataset.href.trim() : "";
        // tenta encontrar um link interno (<a>) como fallback
        const anchor = card.querySelector ? card.querySelector("a[href]") : null;
        const hrefAttr = card.getAttribute ? card.getAttribute("href") : null;

        const baseUrl = urlFromDataset || (anchor && anchor.href) || hrefAttr || null;
        if (!baseUrl) {
          console.warn("Card sem URL definido (data-href / <a href> / href).", card);
          return;
        }

        // captura IDs do dataset (eventId/localId)
        const eventId = card.dataset ? card.dataset.eventId : null;
        const localId = card.dataset ? card.dataset.localId : null;

        // monta params
        const params = new URLSearchParams();
        if (eventId) params.append("eventId", eventId);
        if (localId) params.append("localId", localId);

        // se o filtro de data estiver preenchido, adiciona 'entrada' (yyyy-mm-dd)
        if (dataSel && dataSel.value) {
          // dataSel.value já vem no formato yyyy-mm-dd (inputs date)
          params.append("entrada", dataSel.value);
        }

        const finalUrl = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${params.toString()}`;

        // Se o card for um link real (<a>), deixa o comportamento natural acontecer (não previne).
        // Caso contrário, previne e redireciona manualmente.
        if (card.tagName && card.tagName.toLowerCase() === "a" && !e.defaultPrevented) {
          // atualiza href do anchor para garantir parâmetros
          if (anchor) {
            anchor.href = finalUrl;
            // permite clique seguir o link nativamente
            return;
          }
        }

        e.preventDefault();
        window.location.href = finalUrl;

      } catch (err) {
        console.error("Erro ao processar clique no card:", err);
      }
    });
  });

  // aplica filtro inicial (caso haja valores pré-setados)
  applyFilters();

});
