const firebaseConfig = {
    apiKey: "AIzaSyB-CoFIzUTXvYTWyBnqtAy-o7B-Ni7FxGo",
    authDomain: "formulariowfirebase.firebaseapp.com",
    projectId: "formulariowfirebase",
    storageBucket: "formulariowfirebase.firebasestorage.app",
    messagingSenderId: "396576803095",
    appId: "1:396576803095:web:af1acc5bd0bd10aeb58f52",
    measurementId: "G-S2179LJ0RS"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()
//                                                                          validación del nombre
    let nombreEntrada = document.getElementById('name')
    let nombreError = document.getElementById('nameError')

    if (nombreEntrada.value.trim() === '') {
        nombreError.textContent = 'Por favor, introducí tu nombre'
        nombreError.classList.add('error-message')
    } else {
        nombreError.textContent = ''
        nombreError.classList.remove('error-message')
    }
//                                                                          validación del email
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
//                                                                          validación de la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, caracteres especiales, mayúsculas y minúsculas'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }
//                                                                          validación de todos los campos
    if (!nombreError.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: nombreEntrada.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert ('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset()
        })
        .catch((error) => {
            alert (error);
        });
        
    }
})