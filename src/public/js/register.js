const formRegister = document.getElementById('formRegister');
const firtsName = document.getElementById('firtsName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');


formRegister.addEventListener('submit', (e) => {
    e.preventDefault();


    fetch ('/api/session/registro',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        firts_name: firtsName.value, 
        last_name: lastName.value, 
        email: email.value,
        password: password.value, 
        age: age.value
    }),
})
    .then((res) => res.json())
    .then((data) => {
        window.alert('Usuario creado');
        window.location.href = '/api/session';
    })
    .catch((err) => { 
        window.alert(`Error al crear usuario. ${err}`)
    })
});


