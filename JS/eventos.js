// JS/eventos.js

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // ELEMENTOS
    // -------------------------------
    const cidadeSel = document.getElementById("cidade");
    const tipoSel = document.getElementById("tipo");
    const dataSel = document.getElementById("data");

    const cardsContainer = document.getElementById("cardsContainer");
    const noResults = document.getElementById("noResults");
    const resultsCount = document.getElementById("resultsCount");

    const cards = Array.from(document.querySelectorAll(".real-events .card") || []);


    // -------------------------------
    // FILTRAGEM DE EVENTOS
    // -------------------------------
    function applyFilters() {
        if (!cardsContainer) return;

        const cidade = cidadeSel?.value || "";
        const tipo = tipoSel?.value || "";
        const data = dataSel?.value ? new Date(dataSel.value + "T00:00") : null;

        let visible = 0;

        cards.forEach(card => {
            const eventCity = card.dataset.city;
            const eventType = card.dataset.type;

            const start = card.dataset.start ? new Date(card.dataset.start + "T00:00") : null;
            const end = card.dataset.end ? new Date(card.dataset.end + "T23:59") : null;

            let show = true;

            if (cidade && cidade !== eventCity) show = false;
            if (tipo && tipo !== eventType) show = false;

            if (data) {
                if (!(start && end && data >= start && data <= end)) {
                    show = false;
                }
            }

            card.classList.toggle("hidden", !show);
            if (show) visible++;
        });

        if (resultsCount)
            resultsCount.textContent = `${visible} evento(s) encontrado(s)`;

        if (noResults)
            noResults.style.display = visible === 0 ? "block" : "none";
    }


    // Listeners dos filtros
    [cidadeSel, tipoSel, dataSel].forEach(el => {
        if (!el) return;
        el.addEventListener("input", applyFilters);
    });



    // -------------------------------
    // FAVORITAR
    // -------------------------------
    document.addEventListener("click", e => {
        const btn = e.target.closest(".favorite-btn");
        if (btn) btn.classList.toggle("active");
    });



    // -------------------------------
    // REDIRECIONAMENTO DOS CARDS (ATUALIZADO)
    // -------------------------------
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            try {
                // Ignora se clicar no botão de favorito
                if (e.target.closest(".favorite-btn")) return;

                const baseUrl = "ex.html";

                // Dados essenciais
                const eventId = card.dataset.eventId;
                const localId = card.dataset.localId;

                const titleEl = card.querySelector("h3");
                const imgEl = card.querySelector("img");

                const title = titleEl ? titleEl.textContent.trim() : "";
                const img = imgEl ? imgEl.src : "";

                const start = card.dataset.start; // YYYY-MM-DD
                const end   = card.dataset.end;   // YYYY-MM-DD

                const params = new URLSearchParams();

                params.set("eventId", eventId);
                params.set("localId", localId);
                params.set("title", title);
                params.set("img", img);

                // -------------------------------
                // LÓGICA CORRIGIDA DE ENTRADA/SAÍDA
                // -------------------------------

                let entrada = null;
                let saida = null;

                // Entrada → prioridade absoluta para filtro do usuário
                if (dataSel && dataSel.value) {
                    entrada = dataSel.value;
                } else if (start) {
                    entrada = start;
                }

                // Saída → se usuário escolheu data, saída = mesma data
                if (dataSel && dataSel.value) {
                    saida = dataSel.value;
                } else if (end) {
                    saida = end;
                }

                // Evitar entrada > saída
                if (entrada && saida && entrada > saida) {
                    saida = entrada;
                }

                params.set("entrada", entrada);
                params.set("saida", saida);

                // -------------------------------
                // REDIRECIONAMENTO FINAL
                // -------------------------------
                const finalUrl = `${baseUrl}?${params.toString()}`;

                e.preventDefault();
                window.location.href = finalUrl;

            } catch (err) {
                console.error("Erro ao processar clique no card:", err);
            }
        });
    });



    // -------------------------------
    // EXECUTAR FILTRO NA INICIALIZAÇÃO
    // -------------------------------
    applyFilters();
});


document.addEventListener("DOMContentLoaded", () => {

  const cityFilter = document.getElementById("cidade");
  const typeFilter = document.getElementById("tipo");
  const dateFilter = document.getElementById("data");
  const cardsContainer = document.querySelector(".real-events");

  if (!cardsContainer) return;

  const cards = cardsContainer.querySelectorAll(".card");

  function filterCards() {
    const city = cityFilter?.value || "";
    const tipo = typeFilter?.value || "";
    const data = dateFilter?.value || "";

    cards.forEach(card => {
      let show = true;

      const eventCity = card.dataset.city;
      const eventType = card.dataset.type;
      const start = card.dataset.start || null;
      const end = card.dataset.end || null;

      if (city && city !== eventCity) show = false;
      if (tipo && tipo !== eventType) show = false;

      if (data) {
        if (start && end) {
          if (data < start || data > end) show = false;
        } else if (start && !end) {
          if (data < start) show = false;
        }
      }

      card.style.display = show ? "block" : "none";
    });
  }

  cityFilter?.addEventListener("change", filterCards);
  typeFilter?.addEventListener("change", filterCards);
  dateFilter?.addEventListener("change", filterCards);
});
