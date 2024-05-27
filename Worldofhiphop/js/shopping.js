import initializeHearts from "./wishlist.js";

let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let cartCounter = document.querySelector('.icon-cart .itemCounter');

let listProducts = [];
let carts = [];

// Event listener voor het tonen/verbergen van de winkelwagen bij het klikken op het icoon
iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

// Event listener voor het sluiten van de winkelwagen bij het klikken op de sluitknop
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

// Functie om productgegevens aan de HTML toe te voegen
const addDataToHtml = () => {
  listProductHTML.innerHTML = '';
  if (listProducts.length > 0) {
    listProducts.forEach(product => {
      let newProduct = document.createElement('section');
      newProduct.classList.add('item');
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <i class="fa fa-heart heart"></i>
        <img src="${product.img}" alt="Breakdancer" />
        <h2>${product.name}</h2>
        <article class="price">€ ${product.price}</article>
        <button class="addCart">Toevoegen aan winkelmandje</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
  initializeHearts();
};

// Event listener voor het toevoegen van producten aan het winkelmandje
listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains('addCart')) {
    let product_id = positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
});

// Functie om een product aan het winkelmandje toe te voegen
const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id === product_id);
  if (carts.length <= 0) {
    carts = [{
      product_id: product_id,
      quantity: 1
    }];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
};

// Functie om de totale prijs van de toegevoegde lessen te berekenen en te weergeven
const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector('.totalSelected');
  let totalSelected = 0;

  if (carts.length > 0) {
    carts.forEach(cart => {
      const positionProduct = listProducts.findIndex(value => value.id == cart.product_id);
      const productInfo = listProducts[positionProduct];
      totalSelected += productInfo.price * cart.quantity;
    });
  }

  totalPriceElement.textContent = `€ ${totalSelected.toFixed(2)}`;
};

// Functie om het winkelmandje aan de HTML toe te voegen
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach(cart => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement('section');
      newCart.classList.add('item');
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
        <article class="image">
          <img src="${info.img}" alt="image of a dancer"/>
        </article>
        <article class="name">${info.name}</article>
        <article class="totalPrice">€ ${info.price * cart.quantity}</article>
        <article class="quantity">
          <span class="minus">-</span>
          <span>${cart.quantity}</span>
          <span class="plus">+</span>
        </article>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  updateTotalPrice(); // functie oproepen om de totale prijs bij te werken.
  cartCounter.innerText = totalQuantity;
};

// Event listener voor het wijzigen van de hoeveelheid in het winkelmandje
listCartHTML.addEventListener('click', (event) => {
  const target = event.target;
  const item = target.closest('.item');
  
  if (item) {
    const product_id = item.dataset.id;
    const type = target.classList.contains('plus') ? 'plus' : target.classList.contains('minus') ? 'minus' : null;

    if (type) {
      changeQuantity(product_id, type);
    }
  }
});

// Functie om de hoeveelheid van een product in het winkelmandje te wijzigen
const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if (positionItemInCart >= 0) {
    switch (type) {
      case 'plus':
        carts[positionItemInCart].quantity += 1;
        break;
      default:
        carts[positionItemInCart].quantity = Math.max(0, carts[positionItemInCart].quantity - 1);
        if (carts[positionItemInCart].quantity === 0) {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
};

// Functie om data op te halen vanuit JSON
const getData = () => {
  fetch('js/json/products.json')
    .then(response => response.json())
    .then(data => {
      listProducts = data;
      addDataToHtml();
    });
};

// Initiële oproep om data op te halen
getData();
