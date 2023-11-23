const signUpButton = document.getElementById('actionSignUp');
const signInButton = document.getElementById('actionSignIn');
const formSignIn = document.getElementById('formSignIn');
const formSignUp = document.getElementById('formSignUp');

signUpButton.addEventListener('click', setSignUpForm);
signInButton.addEventListener('click', setSignInForm);

/**
 * [ A função altera os estilos do formulário cadastro, para que ele se torne vísivel para o usuário ]
 * 
 * @returns {void}
 */
function setSignUpForm() {
    signUpButton.classList.add('selected');
    signInButton.classList.remove('selected');

    formSignIn.style.display = 'none';
    formSignUp.style.display = 'flex';
}

/**
 * [ A função altera os estilos do formulário Login, para que ele se torne vísivel para o usuário ]
 * 
 * @returns {void}
 */
function setSignInForm() {
    signInButton.classList.add('selected');
    signUpButton.classList.remove('selected');

    formSignIn.style.display = 'flex';
    formSignUp.style.display = 'none';
}

const submitLogin = formSignIn.querySelector('button');
const submitRegister = formSignUp.querySelector('button');

submitRegister.addEventListener('click', (event) => getDataUser(event));

/**
 * [ A função salva os dados enviados pelo usuário do formulário de cadastro no LocalStorage ]
 * > Cria um objeto no LocalStorage simulando um banco de dados com os dados do usuário
 * >> Redireciona o usuário para a tela de login
 * @returns {void}
 */
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

/**
 * [ A função verifica se o usuário preecheu os campos do formulário de login corretamente, de acordo com os dados preenchidos no formulário de cadastro ]
 * > Realiza a pesquisa e comparação pelos dados no objeto "new_user" do LocalStorage
 * >> Caso o usuário cometa um erro, ele redireciona o usuário para a tela de cadastro novamente
 * @returns {void}
 */
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
        location.href = './src/pages/home.html';
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

/**
 * [ A função realiza as animações dos spans que são utilizados como label nos inputs ]
 * @returns {void}
 */
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

/**
 * [ A função exibe ou esconde a senha do campo senha e confirmar senha, quando o usuário realiza o evento de click no icone ]
 * @returns {void}
 */
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