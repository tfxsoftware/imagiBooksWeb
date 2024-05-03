// Validação do formulário de registro
const registroForm = document.querySelector('#registro form');

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

    
        fetch('http://18.230.206.14:5000/user/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                alert('Cadastro bem-sucedido!');
                registroForm.reset();
            } else {
                throw new Error('Erro ao processar o cadastro');
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
