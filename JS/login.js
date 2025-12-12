const form = document.getElementById("formLogin");
const url = "http://localhost:8080/usuarios/login";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData);

    console.log("Enviando JSON:", loginData); // DEBUG

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            alert("Erro: " + await response.text());
            return;
        }

        const usuario = await response.json();
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";

    } catch (e) {
        alert("Erro ao conectar com o servidor.");
        console.error(e);
    }
});
