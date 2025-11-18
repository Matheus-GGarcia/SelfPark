// Redirecionamentos dos botões
const links = [
  ['reservarBtn', 'reservar.html'],
  ['loginBtn', 'login.html'],
  ['cadastroBtn', 'cadastro.html'],
  ['footerReservar', 'reservar.html'],
  ['footerLogin', 'login.html'],
  ['footerCadastro', 'cadastro.html']
];

links.forEach(([id, page]) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = page;
    });
  }
});

// Logo leva à home
document.getElementById('homeLogo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('footerLogo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar animada ao rolar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.style.padding = '0.6rem 2rem';
    navbar.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
  } else {
    navbar.style.padding = '1rem 2rem';
    navbar.style.boxShadow = 'none';
  }
});


  const frase1 = document.getElementById("frase1");
const frase2 = document.getElementById("frase2");

// Estado inicial
frase1.classList.add("show");

function ciclo() {
  // Troca para frase 2
  setTimeout(() => {
    frase1.classList.add("hide-up");

    setTimeout(() => {
      frase1.classList.remove("show", "hide-up");
      frase2.classList.add("show");
    }, 900);
  }, 5000);

  // Volta para frase 1
  setTimeout(() => {
    frase2.classList.add("hide-up");

    setTimeout(() => {
      frase2.classList.remove("show", "hide-up");
      frase1.classList.add("show");
    }, 900);
  }, 11000); // 5s frase1 + 1s transição + 5s frase2

  // Reinicia o ciclo após tudo terminar
  setTimeout(ciclo, 12000);
}

// Inicia ciclo
ciclo();



const track = document.querySelector(".carousel-track");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
const cards = document.querySelectorAll(".carousel-card");
const total = cards.length;

/* Criar os pontos */
for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".carousel-dots div");

/* Função de atualização */
function updateCarousel() {
    track.style.transform = `translateX(-${index * (cards[0].offsetWidth + 30)}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

/* Clicar nos pontos */
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
});

/* Carrossel automático */
setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
}, 4500);

/* Swipe no celular */
let startX = 0;

track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
        index = (index + 1) % total;
        updateCarousel();
    } else if (endX - startX > 50) {
        index = (index - 1 + total) % total;
        updateCarousel();
    }
});


//MAPAA//


 const mapFrame = document.getElementById('mapFrame');
    const locationName = document.getElementById('locationName');
    const centerBtn = document.getElementById('centerButton');
    const statusText = document.getElementById('statusText');
    const mapWrapper = document.getElementById('mapWrapper');
    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas.getContext('2d');

    let caminho = [];

    // Ajusta tamanho do canvas conforme o container
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
      const url = `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
      mapFrame.src = url;
      locationName.textContent = nome || `Lat ${lat.toFixed(5)}, Lon ${lon.toFixed(5)}`;

      mapWrapper.classList.remove('zoomed');
      void mapWrapper.offsetWidth;
      setTimeout(() => mapWrapper.classList.add('zoomed'), 60);
      statusText.textContent = 'Localização atualizada';
      setTimeout(()=> statusText.textContent = '', 2500);
    }

    async function pegarNomeDoLocal(lat, lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&addressdetails=1`;
      try {
        const res = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } });
        const data = await res.json();
        const addr = data.address || {};
        return addr.road
          ? `${addr.road}${addr.suburb ? ', ' + addr.suburb : ''}${addr.city ? ', ' + addr.city : ''}`
          : data.display_name || "Localização atual";
      } catch {
        return "Localização atual";
      }
    }

    function latLonToXY(lat, lon) {
      const x = (lon + 180) * (canvas.width / 360);
      const y = (canvas.height / 2) - (canvas.width * Math.log(Math.tan((Math.PI/4)+(lat*Math.PI/360))) / (2*Math.PI));
      return {x, y};
    }

    function iniciarRastreamento() {
      if (!navigator.geolocation) {
        statusText.textContent = 'Geolocalização não suportada.';
        return;
      }

      navigator.geolocation.watchPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const nome = await pegarNomeDoLocal(lat, lon);
        atualizarMapa(lat, lon, nome);

        const ponto = latLonToXY(lat, lon);
        caminho.push(ponto);
        if (caminho.length > 100) caminho.shift();
        desenharTrilha();
      },
      (err) => {
        console.error(err);
        statusText.textContent = 'Erro na geolocalização.';
      },
      { enableHighAccuracy:true, maximumAge:2000, timeout:8000 });
    }

    window.onload = iniciarRastreamento;
    centerBtn.addEventListener('click', iniciarRastreamento);