const express = require('express');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const app = express();
const cors = require('cors');
app.use(cors());


// Configuração do Firebase
 //const firebaseConfig = {
    // apiKey: "AIzaSyCD1MHguVoNdHkCUkUax8ipCE1zfn0sWKQ",
    //authDomain: "imagibooks.firebaseapp.com",
   //  projectId: "imagibooks",
   //  storageBucket: "imagibooks.appspot.com",
    // messagingSenderId: "672389904540",
    // appId: "1:672389904540:web:5c61ea3064ec312ac99559",
    // measurementId: "G-SC98VVPQGL"
 //};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Configuração do Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com o login
app.post('/', (req, res) => {
    const { username, password } = req.body;

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Login bem-sucedido
            res.redirect('/perfil.html');
        })
        .catch((error) => {
            // Erro de login
            res.status(401).sendFile(path.join(__dirname, 'public', 'login.html'));
        });
});

// Rota para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
