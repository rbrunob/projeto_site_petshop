function setUserName() {
    const user = JSON.parse(localStorage.getItem('new_user'))

    const linkProfile = document.getElementById('nameUser');

    linkProfile.style.textTransform = 'capitalize';

    linkProfile.textContent = `Olá, ${user.name.split(' ')[0]}`;
}

setUserName()

const Pets = JSON.parse(localStorage.getItem('Pets')) || [];

function CreatePet(Pets) {

    let pets = [];

    pets.push(Pets.map((pet, index) => (`
    <div class="pet">
        <div id="petType" class="pet_infos">
            <i class="ph ph-${pet.type}"></i>
        </div>

        <div id="petName" class="pet_infos">
            ${pet.name}
        </div>

        <div id="petTemperament" class="pet_infos">
            ${pet.temperament}
        </div>

        <div id="petBreed" class="pet_infos">
            ${pet.breed}
        </div>

        <div id="petSpecies" class="pet_infos">
            ${pet.species}
        </div>

        <button id="service" data-id="${index}" class="pet_service">
            Agendar serviço
        </button>
    </div>`
    )).join(''));

    return pets;
}

function insertItemsIntoContainer() {
    const allPets = CreatePet(Pets).join('');

    const containerPets = document.querySelector('.container_pets');

    containerPets.insertAdjacentHTML('beforeend', allPets);
}

insertItemsIntoContainer()

const addPetButton = document.getElementById('addPet');

addPetButton.addEventListener('click', popUpToAddPet);

function popUpToAddPet() {
    const body = document.body;

    const popup = `
        <div id="addPetPopup" class="add_pet_popup">
            <div id="closeCreatePet" class="close"></div>

            <form>
                <h2>Adicione o seu pet</h2>
                <label>
                    <span class="label_input">Nome do Pet</span>
                    <input type="text" required id="namePet" />
                </label>

                <label>
                    <span class="label_input">Temperamento do pet</span>
                    <input type="text" required id="temperamentPet" />
                </label>

                <label>
                    <span class="label_input">Raça do pet</span>
                    <input type="text" required id="breedPet" />
                </label>

                <label>
                    <span class="label_input">Número para contato</span>
                    <input type="number" required id="contactPet" />
                </label>

                <div class="container_species" id="speciePet">
                    <label>
                        <input type="radio" name="specie" value="dog" required />
                        <span class="label_radio">Cachorro</span>
                    </label>

                    <label>
                        <input type="radio" name="specie" value="cat" required />
                        <span class="label_radio">Gato</span>
                    </label>

                    <label>
                        <input type="radio" name="specie" value="fish" required />
                        <span class="label_radio">Peixe</span>
                    </label>
                </div>
                <div class="container_actions">
                    <button id="cancel">Cancelar</button>
                    <button id="save">Adicionar</button>
                </div>
            </form>
        </div>
    `;

    body.insertAdjacentHTML('beforeend', popup);

    const container = document.getElementById('addPetPopup');
    const inputs = container.querySelectorAll('input')

    inputs.forEach(input => {
        input.addEventListener('click', (event) => animateLabelInputs(event))
    })

    const add = document.getElementById('save');
    add.addEventListener('click', (event) => getDataPet(event))
}

function animateLabelInputs(event) {
    const type = event.target.getAttribute('type');

    if (type != 'radio') {
        let span = event.target.parentNode.querySelector('.label_input');

        span.classList.add('active');
    }
}

function getDataPet(event) {
    event.preventDefault();

    const container = document.getElementById('addPetPopup');

    const inputs = container.querySelectorAll('input');

    let type;

    for (const input of inputs) {
        if (input.checked) {
            type = input;
            break;
        }
    }

    let sendTo = {
        "type": type.value,
        "name": inputs[0].value,
        "temperament": inputs[1].value,
        "breed": inputs[2].value,
        "number": inputs[3].value,
        "species": type.parentNode.children[1].textContent
    };

    Pets.push(sendTo);

    localStorage.setItem('Pets', JSON.stringify(Pets));

    location.reload();
}