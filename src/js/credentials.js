const signUpButton = document.getElementById('actionSignUp');
const signInButton = document.getElementById('actionSignIn');
const formSignIn = document.getElementById('formSignIn');
const formSignUp = document.getElementById('formSignUp');

signUpButton.addEventListener('click', setSignUpForm);
signInButton.addEventListener('click', setSignInForm);

function setSignUpForm() {
    signUpButton.classList.add('selected');
    signInButton.classList.remove('selected');

    formSignIn.style.display = 'none';
    formSignUp.style.display = 'flex';
}

function setSignInForm() {
    signInButton.classList.add('selected');
    signUpButton.classList.remove('selected');

    formSignIn.style.display = 'flex';
    formSignUp.style.display = 'none';
}

const submitLogin = formSignIn.querySelector('button');
const submitRegister = formSignUp.querySelector('button');

submitRegister.addEventListener('click', (event) => getDataUser(event));

function getDataUser(event) {
    event.preventDefault();

    const inputs = formSignUp.querySelectorAll('input');

    let inputValue = [];

    inputs.forEach(input => inputValue.push({ name: input.id, values: input.value }))

    let sendTo = {};

    inputValue.map(values => sendTo[values.name] = values.values)

    localStorage.setItem('new_user', JSON.stringify(sendTo));

    setSignInForm();
}

submitLogin.addEventListener('click', (event) => verifyDataUser(event));

function verifyDataUser(event) {
    event.preventDefault()

    const user = JSON.parse(localStorage.getItem('new_user'));

    if (!user) {
        setSignUpForm();
        return;
    }

    const inputs = formSignIn.querySelectorAll('input');

    let email = inputs[0].value;
    let password = inputs[1].value;

    if (email === user.email && password === user.pass) {
        location.href = './home.html';
    } else {
        setSignUpForm();
        return;
    }
}

const inputsSignIn = formSignIn.querySelectorAll('input');
const inputsSignUp = formSignUp.querySelectorAll('input');

inputsSignIn.forEach(input => {
    input.addEventListener('click', (event) => animateLabelInputs(event))
})

inputsSignUp.forEach(input => {
    input.addEventListener('click', (event) => animateLabelInputs(event))
})

function animateLabelInputs(event) {
    let span = event.target.parentNode.querySelector('.label_input');

    span.classList.add('active');
}


const eyesSignIn = formSignIn.querySelectorAll('label i');
const eyesSignUp = formSignUp.querySelectorAll('label i');

eyesSignIn.forEach(eye => {
    eye.addEventListener('click', (event) => showPassword(event))
})

eyesSignUp.forEach(eye => {
    eye.addEventListener('click', (event) => showPassword(event))
})

function showPassword(event) {
    const passInput = event.target.parentNode.querySelector('input');

    if (event.target.classList.contains('ph-eye-slash')) {
        passInput.type = 'text';
        event.target.classList.replace('ph-eye-slash', 'ph-eye')
    } else {
        passInput.type = 'password';
        event.target.classList.replace('ph-eye', 'ph-eye-slash')
    }
}