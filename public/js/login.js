import { GoogleAuthProvider } from "firebase/auth";

document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('form-login');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('username').value; 
        const senha = document.getElementById('password').value;
        
        if (email.trim() === '' || senha.trim() === '') {
            alert('Todos os campos devem ser preenchidos.');
        } else if (!isValidEmail(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('Login bem-sucedido!');
                loginForm.reset();
                localStorage.setItem('userId', data.userId);
                window.location.href = '/perfil.html';
            
            })
            .catch((error) => {
                console.error('Erro ao processar o login:', error);
                alert('Houve um erro ao processar seu login. Por favor, tente novamente mais tarde.');
            });
        }
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
