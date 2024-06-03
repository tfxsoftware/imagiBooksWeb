document.addEventListener('DOMContentLoaded', function() {
    const sairButton = document.querySelector('.right a[href="#"]');

    sairButton.addEventListener('click', function(event) {
        event.preventDefault();

        const confirmarSaida = confirm("Tem certeza que deseja sair?");
        
        if (confirmarSaida) {
            window.location.href = "home.html";
        }
    });

    const userId = getUserIdFromSession();

    if (userId) {
        fetchBooks(userId);
    }
});

function getUserIdFromSession() {
    return localStorage.getItem('userId');
}

function fetchBooks(userId) {
    fetch(`http://localhost:5000/user/checklist/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos:', data);
            if (data) {
                displayBooks(data, userId);
            } else {
                console.error('Nenhum livro encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar livros:', error));
}

function displayBooks(checklist, userId) {
    const livroContainer = document.querySelector('.livro-container');
    livroContainer.innerHTML = ''; 

    for (const [livro, lido] of Object.entries(checklist)) {
        const livroDiv = document.createElement('div');
        livroDiv.className = 'livro';

        const capaDiv = document.createElement('div');
        capaDiv.className = 'capa';
        const img = document.createElement('img');
        img.src = '/images/LivroImagiBooks.png';
        img.alt = `Capa do ${livro}`;
        capaDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        const h3 = document.createElement('h3');
        h3.textContent = livro;
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Escreva um comentário sobre o livro';
        textarea.value = ''; 

        // Adiciona avaliação com estrelas
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating';
        for (let i = 1; i <= 5; i++) {  // Ordem correta das estrelas
            const star = document.createElement('span');
            star.className = 'star';
            star.innerHTML = '&#9733;'; // Estrela
            star.dataset.value = i;
            star.addEventListener('click', function() {
                setRating(ratingDiv, i);
                saveRating(userId, livro, i);
            });
            ratingDiv.appendChild(star);
        }

        const button = document.createElement('button');
        button.className = 'salvar-comentario';
        button.innerHTML = '<i class="fas fa-save"></i> Salvar Comentário';

        // Adiciona evento ao botão para salvar o comentário
        button.addEventListener('click', function() {
            const comentario = textarea.value;
            saveComment(userId, livro, comentario);
        });

        infoDiv.appendChild(h3);
        infoDiv.appendChild(ratingDiv);
        infoDiv.appendChild(textarea);
        infoDiv.appendChild(button);

        livroDiv.appendChild(capaDiv);
        livroDiv.appendChild(infoDiv);

        livroContainer.appendChild(livroDiv);

        // Busca e exibe comentários existentes
        fetchComment(userId, livro, textarea, ratingDiv);
    }
}

function setRating(ratingDiv, rating) {
    const stars = ratingDiv.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('rated');
        } else {
            star.classList.remove('rated');
        }
    });
}

function saveComment(userId, livro, comentario) {
    fetch(`http://localhost:5000/user/comment/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ livro, comentario })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comentário salvo:', data);
        showMessage('Comentário salvo com sucesso!', 'sucesso');
    })
    .catch(error => {
        console.error('Erro ao salvar comentário:', error);
        showMessage('Erro ao salvar comentário.', 'erro');
    });
}

function saveRating(userId, livro, rating) {
    fetch(`http://localhost:5000/user/rating/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ livro, rating })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Avaliação salva:', data);
    })
    .catch(error => console.error('Erro ao salvar avaliação:', error));
}

function fetchComment(userId, livro, textarea, ratingDiv) {
    fetch(`http://localhost:5000/user/comment/${userId}/${livro}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.comentario) {
                textarea.value = data.comentario;
            }
        })
        .catch(error => console.error('Erro ao buscar comentário:', error));

    fetch(`http://localhost:5000/user/rating/${userId}/${livro}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.rating) {
                setRating(ratingDiv, data.rating);
            }
        })
        .catch(error => console.error('Erro ao buscar avaliação:', error));
}

function showMessage(message, type) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = message;
    mensagemDiv.className = `mensagem ${type}`;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);
}