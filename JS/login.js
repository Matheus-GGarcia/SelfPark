const form = document.getElementById("formLogin");
const url = "http://localhost:8080/usuarios/login";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData);

    console.log("Enviando JSON:", loginData);

    try {
        const response = await axios.post(url, loginData, {
            headers: { "Content-Type": "application/json" }
        });

        const usuario = response.data;

        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert("Login realizado com sucesso!");
        window.location.href = "profile.html";

    } catch (error) {

        if (error.response) {
            // Erro vindo do backend (401, 400, etc)
            alert("Erro: " + error.response.data);
        } else {
            // Erro de conexão
            alert("Erro ao conectar com o servidor.");
        }

        console.error(error);
    }
});
