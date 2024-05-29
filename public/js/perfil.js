document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
        fetch(`http://127.0.0.1:5000/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nomeUsuario').textContent = data.nome;
                document.getElementById('emailUsuario').textContent = data.email;

                // Exibir recomendações
                if (data.recomendacoes && data.recomendacoes.length > 0) {
                    const containerHistorico = document.querySelector('.container-historico');
                    data.recomendacoes.forEach(recomendacao => {
                        const recomendacaoDiv = document.createElement('div');
                        recomendacaoDiv.className = 'recomendacao';
                        recomendacaoDiv.innerHTML = `
                            <p><strong>Livro Inserido:</strong> ${recomendacao.livro_inserido}</p>
                            <p><strong>Livros Recomendados:</strong></p>
                            <ul>
                                ${recomendacao.livros_recomendados.map(livro => `<li>${livro}</li>`).join('')}
                            </ul>
                            <p><strong>Timestamp:</strong> ${new Date(recomendacao.timestamp * 1000).toLocaleString()}</p>
                        `;
                        containerHistorico.appendChild(recomendacaoDiv);
                    });
                } else {
                    const containerHistorico = document.querySelector('.container-historico');
                    const noRecomendacoes = document.createElement('p');
                    noRecomendacoes.textContent = 'Nenhuma recomendação encontrada.';
                    containerHistorico.appendChild(noRecomendacoes);
                }
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
