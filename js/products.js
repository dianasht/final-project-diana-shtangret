let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'Orange Bonbon Tea',
    image: 'b-orange.png',
    price: 9.00
  },
  {
    id: 2,
    name: 'Azahar Oolong Tea',
    image: 'b-azahar.png',
    price: 12.00
  },
  {
    id: 3,
    name: 'Pu Erh Strawberry',
    image: 'b-cream.png',
    price: 9.00
  },
  {
    id: 4,
    name: 'Japan Genmaicha Tea',
    image: 'b-japan.png',
    price: 10.50
  },
  {
    id: 5,
    name: 'White Sakura Beauty Blend',
    image: 'whitesakura.png',
    price: 10.00
  },
  {
    id: 6,
    name: 'Black Tea with Berries',
    image: 'blackberries.png',
    price: 6.50
  },
  {
    id: 7,
    name: 'Irish Tea',
    image: 'irishtea.png',
    price: 9.50
  },
  {
    id: 8,
    name: 'Sunny Peach Tea',
    image: 'sunnypeach.png',
    price: 8.50
  },
  {
    id: 9,
    name: 'White Strawberries',
    image: 'whitestrawbery.png',
    price: 9.50
  },
  {
    id: 10,
    name: 'Italian Panettone',
    image: 'italian.png',
    price: 10.00
  },
  {
    id: 11,
    name: 'Pu Erh Choco',
    image: 'choco.png',
    price: 12.50
  },
  {
    id: 12,
    name: 'Earl Grey',
    image: 'grey.png',
    price: 9.00 
  },
];


let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  })
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  })
  total.innerText = `$${totalPrice.toLocaleString()}`;
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

function searchProducts() {
  let searchInput = document.getElementById('searchInput').value.toLowerCase();
  let filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));

  list.innerHTML = '';

  filteredProducts.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="image/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(listCards));
}
