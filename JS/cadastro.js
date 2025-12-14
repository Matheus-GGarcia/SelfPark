const form = document.getElementById("formulario");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        placa: document.getElementById("placa").value
    };

    console.log("Enviando:", dados);

    try {
        const response = await axios.post(
            "http://localhost:8080/usuarios/criar",
            dados,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Resposta:", response.data);
        alert("Cadastro realizado com sucesso!");

        // 🔁 REDIRECIONAMENTO
        window.location.href = "login.html";

    } catch (error) {
        console.error("Erro:", error.response?.data || error.message);
        alert("Erro ao cadastrar usuário!");
    }
});
