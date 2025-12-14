/* ============================
   LINKS E REDIRECIONAMENTOS
============================ */

const links = [
  ['loginBtn', 'login.html'],
  ['cadastroBtn', 'cadastro.html'],
  ['footerReservar', 'reservar.html'],
  ['footerLogin', 'login.html'],
  ['footerCadastro', 'cadastro.html'],
  ['profileBtn', 'profile.html']
];

links.forEach(([id, page]) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = page;
    });
  }
});

/* ============================
   LOGOS (PROTEGIDOS)
============================ */

const homeLogo = document.getElementById('homeLogo');
if (homeLogo) {
  homeLogo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const footerLogo = document.getElementById('footerLogo');
if (footerLogo) {
  footerLogo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================
   NAVBAR SCROLL
============================ */

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.padding = '0.6rem 2rem';
      navbar.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
    } else {
      navbar.style.padding = '1rem 2rem';
      navbar.style.boxShadow = 'none';
    }
  });
}

/* ============================
   🔥 ANIMAÇÃO FRASES (CORRIGIDA)
============================ */

document.addEventListener("DOMContentLoaded", () => {
  const frase1 = document.getElementById("frase1");
  const frase2 = document.getElementById("frase2");

  if (!frase1 || !frase2) return;

  frase1.classList.add("show");
  frase2.classList.remove("show", "hide-up");

  let mostrandoFrase1 = true;

  setInterval(() => {
    if (mostrandoFrase1) {
      frase1.classList.add("hide-up");

      setTimeout(() => {
        frase1.classList.remove("show", "hide-up");
        frase2.classList.add("show");
      }, 900);
    } else {
      frase2.classList.add("hide-up");

      setTimeout(() => {
        frase2.classList.remove("show", "hide-up");
        frase1.classList.add("show");
      }, 900);
    }

    mostrandoFrase1 = !mostrandoFrase1;
  }, 6000);
});

/* ============================
   CARROSSEL
============================ */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!track || !dotsContainer || dotsContainer.dataset.ready) return;

  dotsContainer.dataset.ready = "true"; // trava execução dupla

  const cards = track.querySelectorAll(".carousel-card");
  if (!cards.length) return; // agora é seguro (dentro da função)

  let index = 0;

  const cardGap = 30;
  const cardWidth = cards[0].offsetWidth + cardGap;
  const totalPages = cards.length;

  // limpa bolinhas duplicadas
  dotsContainer.innerHTML = "";

  // cria bolinhas corretas
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateCarousel() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
  });

  setInterval(() => {
    index = (index + 1) % totalPages;
    updateCarousel();
  }, 4500);

  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      index = (index + 1) % totalPages;
      updateCarousel();
    } else if (endX - startX > 50) {
      index = (index - 1 + totalPages) % totalPages;
      updateCarousel();
    }
  });
});

/* ============================
   MAPA
============================ */

const mapFrame = document.getElementById('mapFrame');
const locationName = document.getElementById('locationName');
const centerBtn = document.getElementById('centerButton');
const statusText = document.getElementById('statusText');
const mapWrapper = document.getElementById('mapWrapper');
const canvas = document.getElementById('trailCanvas');

if (mapFrame && canvas && mapWrapper) {
  const ctx = canvas.getContext('2d');
  let caminho = [];

  function ajustarCanvas() {
    canvas.width = mapWrapper.clientWidth;
    canvas.height = mapWrapper.clientHeight;
  }

  window.addEventListener('resize', ajustarCanvas);
  ajustarCanvas();

  function desenharTrilha() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (caminho.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(caminho[0].x, caminho[0].y);
    for (let i = 1; i < caminho.length; i++) {
      ctx.lineTo(caminho[i].x, caminho[i].y);
    }
    ctx.strokeStyle = 'rgba(59,130,246,0.75)';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(59,130,246,0.5)';
    ctx.stroke();
  }

  function atualizarMapa(lat, lon, nome) {
    mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
    if (locationName) locationName.textContent = nome || 'Localização atual';

    mapWrapper.classList.remove('zoomed');
    void mapWrapper.offsetWidth;
    mapWrapper.classList.add('zoomed');

    if (statusText) {
      statusText.textContent = 'Localização atualizada';
      setTimeout(() => statusText.textContent = '', 2500);
    }
  }

  async function pegarNomeDoLocal(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`);
      const data = await res.json();
      return data.display_name || 'Localização atual';
    } catch {
      return 'Localização atual';
    }
  }

  function iniciarRastreamento() {
    if (!navigator.geolocation) return;

    navigator.geolocation.watchPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      const nome = await pegarNomeDoLocal(latitude, longitude);
      atualizarMapa(latitude, longitude, nome);
    });
  }

  window.addEventListener('load', iniciarRastreamento);
  if (centerBtn) centerBtn.addEventListener('click', iniciarRastreamento);
}

/* ============================
   BOTÕES FINAIS
============================ */

const reservarBtn = document.getElementById("reservarBtn");
if (reservarBtn) reservarBtn.onclick = () => window.location.href = "reservas.html";

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) loginBtn.onclick = () => window.location.href = "login.html";

const cadastroBtn = document.getElementById("cadastroBtn");
if (cadastroBtn) cadastroBtn.onclick = () => window.location.href = "cadastro.html";
