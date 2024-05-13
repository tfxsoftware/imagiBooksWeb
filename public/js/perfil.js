const quizButton = document.getElementById('quiz-button');

quizButton.addEventListener('click', function() {
    
    window.location.href = 'questionario.html';
});

const sairLink = document.getElementById('sair');

sairLink.addEventListener('click', function(event) {
    
    event.preventDefault();
    
    window.location.href = 'home.html';
});
