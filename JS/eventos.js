// JS/eventos.js
document.addEventListener("DOMContentLoaded", () => {
  const cidadeSel = document.getElementById("cidade");
  const tipoSel = document.getElementById("tipo");
  const dataSel = document.getElementById("data");
  const cardsContainer = document.getElementById("cardsContainer");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");

  const cardNodeList = document.querySelectorAll(".real-events .card");
  const cards = Array.from(cardNodeList || []);

  // skeleton handling (if present)
  const skeleton = document.querySelector(".skeleton-wrapper");
  const realEvents = document.querySelector(".real-events");
  if (skeleton && realEvents) {
    setTimeout(() => {
      skeleton.classList.add("hidden");
      realEvents.classList.remove("hidden");
    }, 800);
  }

  function applyFilters() {
    if (!cardsContainer) return;
    cardsContainer.classList.add("filtering");
    setTimeout(() => cardsContainer.classList.remove("filtering"), 250);

    const cidade = cidadeSel ? cidadeSel.value : "";
    const tipo = tipoSel ? tipoSel.value : "";
    const data = (dataSel && dataSel.value) ? new Date(dataSel.value + "T00:00") : null;

    let visible = 0;
    cards.forEach(card => {
      const eventCity = card.dataset ? card.dataset.city : "";
      const eventType = card.dataset ? card.dataset.type : "";
      const start = card.dataset && card.dataset.start ? new Date(card.dataset.start + "T00:00") : null;
      const end = card.dataset && card.dataset.end ? new Date(card.dataset.end + "T23:59") : null;

      let show = true;
      if (cidade && cidade !== eventCity) show = false;
      if (tipo && tipo !== eventType) show = false;
      if (data && (!(start instanceof Date && end instanceof Date) || !(data >= start && data <= end))) show = false;

      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });

    if (noResults) noResults.style.display = (visible === 0 ? "block" : "none");
    if (resultsCount) resultsCount.textContent = `${visible} evento(s) encontrado(s)`;
  }

  [cidadeSel, tipoSel, dataSel].forEach(el => {
    if (el) el.addEventListener("input", applyFilters);
  });

  // Favoritar visual (delegation)
  document.addEventListener("click", e => {
    const btn = e.target.closest ? e.target.closest(".favorite-btn") : null;
    if (btn) btn.classList.toggle("active");
  });

  // Redirect / build params on card click
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      try {
        // if clicked favorite button inside card, ignore
        if (e.target.closest && e.target.closest(".favorite-btn")) return;

        // prefer direct data-href attribute if present
        const urlFromDataset = card.dataset && card.dataset.href ? card.dataset.href.trim() : "";
        // if card is an <a>, baseHref is its href attribute
        const anchor = card.tagName && card.tagName.toLowerCase() === "a" ? card : card.querySelector("a[href]");
        const hrefAttr = anchor ? anchor.getAttribute("href") : null;
        const baseUrl = urlFromDataset || hrefAttr || "ex.html";

        // gather metadata to send forward
        const eventId = card.dataset ? card.dataset.eventId : null;
        const localId = card.dataset ? card.dataset.localId : null;

        // Attempt to read title & image from card DOM
        const titleEl = card.querySelector && card.querySelector("h3");
        const title = titleEl ? titleEl.textContent.trim() : null;
        const imgEl = card.querySelector && card.querySelector("img");
        const img = imgEl ? imgEl.src : null;

        const params = new URLSearchParams();
        if (eventId) params.append("eventId", eventId);
        if (localId) params.append("localId", localId);
        if (title) params.append("title", title);
        if (img) params.append("img", img);

        // If user selected a date in the filter, prefer that as 'entrada' (yyyy-mm-dd)
        if (dataSel && dataSel.value) {
          params.append("entrada", dataSel.value);
        } else if (card.dataset && card.dataset.start) {
          // else, use the card's start date
          params.append("entrada", card.dataset.start);
        }

        const finalUrl = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${params.toString()}`;

        // If the clicked element is actually an anchor, let the browser follow it (but update href so params remain)
        if (anchor && anchor.tagName.toLowerCase() === "a" && !e.defaultPrevented) {
          anchor.href = finalUrl;
          return;
        }

        // Prevent default and redirect
        e.preventDefault();
        window.location.href = finalUrl;
      } catch (err) {
        console.error("Erro ao processar clique no card:", err);
      }
    });
  });

  // initial filter pass
  applyFilters();
});
