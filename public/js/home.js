document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('input[type="submit"]');
    startButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
});
