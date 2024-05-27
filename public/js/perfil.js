document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        fetch(`http://127.0.0.1:5000/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nomeUsuario').textContent = data.nome;
                document.getElementById('emailUsuario').textContent = data.email;
            })
            .catch(error => {
                console.error('Erro ao buscar os dados do usuário:', error);
                alert('Houve um erro ao carregar os dados do usuário. Por favor, tente novamente mais tarde.');
            });
    } else {
        alert('Usuário não está logado.');
        window.location.href = 'login.html';
    }
});

const quizButton = document.getElementById('quiz-button');
quizButton.addEventListener('click', function() {
    window.location.href = 'questionario.html';
});

const sairLink = document.getElementById('sair');
sairLink.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('userId');
    window.location.href = 'home.html';
});
