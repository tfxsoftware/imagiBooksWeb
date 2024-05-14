document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionarioForm');
    var novoContainer = document.getElementById('novoContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var tituloLivro = document.getElementById('generoLiterario').value;
        var userId = "algumUserId"; // Supondo que você tenha alguma lógica para determinar o ID do usuário
        var dataToSend = JSON.stringify({ titulo_livro: tituloLivro, userId: userId });

        fetch('http://127.0.0.1:5000/ai/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataToSend
        })
        .then(response => response.json())
        .then(data => {
            novoContainer.innerHTML = ''; // Limpa o container antes de adicionar novos conteúdos
            if (!data.livros || data.livros.length === 0) {
                novoContainer.textContent = 'Nenhuma recomendação disponível.';
                return;
            }
        
            var novoTitulo = document.createElement('h2');
            novoTitulo.textContent = 'NOSSA RECOMENDAÇÃO PARA VOCÊ';
            novoContainer.appendChild(novoTitulo);
        
            var textoDescricao = document.createElement('p');
            textoDescricao.textContent = data.texto;
            novoContainer.appendChild(textoDescricao);
        
            var novoContainerRecomendacao = document.createElement('div');
            novoContainerRecomendacao.className = 'container-recomendacao';
        
            data.livros.forEach(recomendacao => {
                var recElement = document.createElement('p');
                recElement.textContent = recomendacao;
                novoContainerRecomendacao.appendChild(recElement);
            });
        
            novoContainer.appendChild(novoContainerRecomendacao);
            novoContainer.style.display = 'block'; // Assegura que o container está visível
        })
        .catch(error => {
            console.error('Erro ao buscar recomendações:', error);
            novoContainer.textContent = 'Erro ao buscar recomendações.';
        });
        
        
    });

    var perfilLink = document.getElementById('perfil-link');
    perfilLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.assign('/perfil'); // Ajuste o caminho conforme necessário
    });
});
