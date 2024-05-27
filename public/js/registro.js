const registroForm = document.querySelector('form');

registroForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
        alert('Todos os campos devem ser preenchidos.');
    } else if (!isValidEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
    } else {
        const userData = {
            nome: nome,
            email: email,
            senha: senha
        };

        console.log('Enviando dados:', userData);  // Log para verificar os dados

        fetch('http://127.0.0.1:5000/user/new', {  // Use 'localhost' para testes locais
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            console.log('Resposta do servidor:', response);  // Log para verificar a resposta
            if (response.ok) {
                alert('Cadastro bem-sucedido!');
                registroForm.reset();
                window.location.href = '/perfil.html';  // Redirecionar para perfil.html após o cadastro bem-sucedido
            } else {
                return response.json().then(errData => {
                    throw new Error('Erro ao processar o cadastro: ' + (errData.error || 'Desconhecido'));
                });
            }
        })
        .catch(error => {
            console.error('Erro ao processar o cadastro:', error);
            alert('Houve um erro ao processar seu cadastro. Por favor, tente novamente mais tarde.');
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
