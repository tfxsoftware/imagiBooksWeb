const estrelas = document.querySelectorAll('.avaliacao .estrela');

estrelas.forEach(function(estrela) {
    estrela.addEventListener('click', function() {
        const valorEstrela = parseInt(estrela.getAttribute('data-estrela'));
        const livro = estrela.closest('.livro');
        const avaliacao = livro.querySelector('.avaliacao');
        const estrelas = avaliacao.querySelectorAll('.estrela');

        estrelas.forEach(function(outraEstrela, indice) {
            if (indice < valorEstrela) {
                outraEstrela.classList.add('selecionada');
            } else {
                outraEstrela.classList.remove('selecionada');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sairButton = document.querySelector('.right a[href="#"]');

    sairButton.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que o link seja seguido

        const confirmarSaida = confirm("Tem certeza que deseja sair?");
        
        if (confirmarSaida) {
            window.location.href = "home.html";
        }
    });
});


const botoesRemoverFavorito = document.querySelectorAll('.remover-favorito');

botoesRemoverFavorito.forEach(function(botao) {
    botao.addEventListener('click', function() {
        const confirmarRemocao = confirm("Tem certeza que deseja remover este livro dos favoritos?");
        
        if (confirmarRemocao) {
            const livro = botao.closest('.livro');
            livro.remove();
            alert("Livro removido dos favoritos com sucesso!");
        }
    });
});
