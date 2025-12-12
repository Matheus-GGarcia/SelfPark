const btnSubmit = document.querySelector('input[type="submit"]');

        const url = "http://localhost:8080/usuarios/criar";

        const form = document.getElementById('formulario');


        // enviando dados para a API usando FormData e Fetch

        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(form);

            // FormData é uma interface que permite a construção de um conjunto de pares chave/valor representando  os campos e seus valores.  Ele fornece um modo fácil de construir um conjunto de pares chave/valor que podem ser enviados usando a função fetch().

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (response.ok) {
                alert('Registro inserido com sucesso!');
                console.log(response);
            } else {
                alert('Erro ao inserir registro!');
            }
        });
