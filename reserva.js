function buscar() {
    const valor = document.getElementById('searchInput').value.trim();
    if (valor) alert(`Buscando por: ${valor}`);
}

document.getElementById("footerLogo").onclick = function () {
    window.location.href = "index.html"; // Página Home
}

document.getElementById("homeLogo").onclick = function () {
    window.location.href = "index.html"; // Página Home
}
