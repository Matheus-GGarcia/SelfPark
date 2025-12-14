const form = document.getElementById("formulario");

const placaInput = document.getElementById("placa");


placaInput.addEventListener("blur", buscarVeiculoPorPlaca);

async function buscarVeiculoPorPlaca() {
    const placa = placaInput.value.replace("-", "").toUpperCase();

    // Validação simples
    if (placa.length < 7) return;

    try {
        const response = await axios.get(
            `https://wdapi2.com.br/consulta/${placa}/${API_KEY}`
        );

        const dados = response.data;

        // Preenche os campos
        document.getElementById("marca").value = dados.marca || "";
        document.getElementById("modelo").value = dados.modelo || "";
        document.getElementById("cor").value = dados.cor || "";

    } catch (error) {
        console.error("Erro ao buscar placa:", error.response?.data || error.message);

        alert("Placa não encontrada!");

        // Limpa os campos se der erro
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("cor").value = "";
    }
}

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
