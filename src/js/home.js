const storeItems = [
    {
        "name": "Cama para gato",
        "price": "150,00"
    },
    {
        "name": "Lacheirinha moderna",
        "price": "80,00"
    },
    {
        "name": "Bebedouro de gatinhos",
        "price": "40,00"
    },
    {
        "name": "Coleira para seu pet",
        "price": "30,00"
    }
]

function CreateItemToStore(storeItems) {

    let items = [];

    items.push(storeItems.map((item, index) => (`
        <div class="item">
            <figure>
                <img src="../images/item-0${index + 1}.jpg" alt="Imagem do item número ${index + 1}" />
            </figure>

            <div class="item_informations">
                <div class="item_price">
                    R$ ${item.price.split(',')[0]},<span class="cents">${item.price.split(',')[1]}</span>
                </div>

                <div class="item_actions">
                    <i class="ph ph-basket"></i>
                    <i class="ph ph-heart"></i>
                </div>
            </div>
        </div>`
    )).join(''));

    return items;
}

function insertItemsIntoContainer() {
    const allitems = CreateItemToStore(storeItems).join('');

    const containerItems = document.querySelector('.container_items');

    containerItems.insertAdjacentHTML('beforeend', allitems)
}

insertItemsIntoContainer()

function setUserName() {
    const user = JSON.parse(localStorage.getItem('new_user'))

    const linkProfile = document.getElementById('nameUser');

    linkProfile.style.textTransform = 'capitalize';

    linkProfile.textContent = `Olá, ${user.name.split(' ')[0]}`;
}

setUserName()
