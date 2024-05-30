document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionarioForm');
    var novoContainer = document.getElementById('novoContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var tituloLivro = document.getElementById('generoLiterario').value;
        var userId = localStorage.getItem('userId'); // Obtenha o ID do usuário do localStorage
        if (!userId) {
            alert('Usuário não está logado.');
            return;
        }
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

            // Remover quebras de linha, chaves e aspas simples do início e fim
            var textoFormatado = data.texto.replace(/\\n/g, ' ').replace(/[{}']/g, '').trim();

            var textoDescricao = document.createElement('p');
            textoDescricao.textContent = textoFormatado;
            novoContainer.appendChild(textoDescricao);

            var novoContainerRecomendacao = document.createElement('div');
            novoContainerRecomendacao.className = 'container-recomendacao';

            var listaRecomendacoes = document.createElement('ul');
            data.livros.forEach(livro => {
                var itemLista = document.createElement('li');
                itemLista.textContent = livro;
                listaRecomendacoes.appendChild(itemLista);
            });
            novoContainerRecomendacao.appendChild(listaRecomendacoes);
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
        window.location.assign('/perfil.html'); 
    });

    var sairLink = document.querySelector('.nav__link[href="#sair"]');
    sairLink.addEventListener('click', function(event) {
        event.preventDefault(); // Previne a navegação padrão
        window.location.assign('/home.html'); // Redireciona para home.html
    });
});