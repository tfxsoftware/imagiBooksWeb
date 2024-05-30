const express = require('express');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
    const { username, password } = req.body;

    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            res.redirect('/perfil.html');
        })
        .catch((error) => {
            console.error('Login error:', error);
            res.redirect('/?error=invalid_credentials');
        });
});

app.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const userId = userCredential.user.uid;

        await setDoc(doc(db, 'users', userId), { nome, email });

        res.json({ userId: userId });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
