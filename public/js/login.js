document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-login');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '123') {
            alert('Login bem-sucedido!');
            window.location.href = 'perfil.html';
        } else {
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });
});
