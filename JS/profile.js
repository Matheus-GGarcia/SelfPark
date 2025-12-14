document.addEventListener("DOMContentLoaded", () => {

    // 🔐 Verifica se existe usuário logado
    const usuarioJSON = localStorage.getItem("usuario");

    if (!usuarioJSON) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    // 🧾 Preenche os campos do formulário
    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("placa").value = usuario.placa || "";

    // 🖼 Avatar dinâmico com nome do usuário
    const avatar = document.getElementById("userAvatar");
    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=1e3c72&color=fff`;
});


// 💾 Salvar alterações
document.getElementById("formProfile").addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.querySelector(".btn-save");
    const originalText = btn.innerText;

    btn.innerText = "Salvando...";
    btn.style.backgroundColor = "#2ecc71"; // Verde

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const dadosAtualizados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        placa: document.getElementById("placa").value
    };

    const senha = document.getElementById("senha").value;
    if (senha) {
        dadosAtualizados.senha = senha;
    }


    try {
        // 🔁 Ajuste a URL conforme seu backend
        const response = await axios.put(
            `http://localhost:8080/usuarios/${usuario.email}`,
            dadosAtualizados,
            { headers: { "Content-Type": "application/json" } }
        );


        // 🔄 Atualiza o localStorage com os novos dados
        localStorage.setItem("usuario", JSON.stringify(response.data));

        setTimeout(() => {
            alert("Dados atualizados com sucesso!");
            btn.innerText = originalText;
            btn.style.backgroundColor = "#1e3c72";
        }, 800);

    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar os dados.");

        btn.innerText = originalText;
        btn.style.backgroundColor = "#1e3c72";
    }
});


// 🚪 Logout
function logout() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem("usuario");
        window.location.href = "index.html";
    }
}
