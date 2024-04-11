
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionarioForm');
    var novoContainer = document.getElementById('novoContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        novoContainer.innerHTML = '';

        var novoTitulo = document.createElement('h2');
        novoTitulo.textContent = 'NOSSA RECOMENDAÇÃO PARA VOCÊ';

        var novoContainerRecomendacao = document.createElement('div');
        novoContainerRecomendacao.className = 'container-recomendacao';
        novoContainerRecomendacao.appendChild(novoTitulo);

        novoContainer.parentNode.insertBefore(novoContainerRecomendacao, novoContainer);

        var novoContainerHTML = `
            <p>TÍTULO DO LIVRO</p>
            <p>DESCRIÇÃO DO LIVRO</P>
            <div class="container-informacoes" style="background-color: var(--first-color); padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-top: 20px;">
                <h2>Novo Container</h2>
                <p>Este é um novo container gerado após clicar no botão "Buscar".</p>
            </div>
        `;

        novoContainer.innerHTML = novoContainerHTML;

        novoContainer.style.display = 'block';
    });
    
});
document.addEventListener('DOMContentLoaded', function() {
    
    var perfilLink = document.getElementById('perfil-link');

    perfilLink.addEventListener('click', function(event) {
        
        event.preventDefault();

        window.location.assign('perfil.html');
    });
});


