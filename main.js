// // JavaScript code to toggle navigation menu
// const menuIcon = document.querySelector('.menu-icon');
// const navLinks = document.querySelector('.navlinks');

// menuIcon.addEventListener('click', () => {
//     navLinks.classList.toggle('navlinks-active');
// });

// let cartItems = [];
// function message(itemName){
//     $('#cartCount').text(cartItems.length);
//     $('#addToCartPopup .modal-body').text(itemName + ' has been added to your cart.');
//     // Show popup message
//     $('#addToCartPopup').modal('show');
//     setTimeout(function () {
//         $('#addToCartPopup').modal('hide');
//     }, 2000); 
// }

// function addToCart(itemName, itemPrice) {
//     cartItems.push({ name: itemName, price: itemPrice });
//     updateCartCount();
//     updateTotalPrice();
//     message(itemName);
// }

// function removeFromCart(index) {
//     cartItems.splice(index, 1);
//     updateCartModal();
//     updateCartCount();
//     updateTotalPrice();
// }

// function updateCartModal() {
//     let cartContent = document.getElementById("cartContent");
//     cartContent.innerHTML = "";
//     let baseUrl = "images/";
//     let totalPrice = 0;
//     cartItems.forEach((item, index) => {
//         let price = item.price;
//         totalPrice += price;
//         cartContent.innerHTML += `
//              <div>
//                  <img src="${baseUrl}${item.name}.png" alt="${item.name}">
//                  ${item.name} - ₹${price} 
//                  <button class="remove-btn" onclick="removeFromCart(${index})"><img src="images/delete.png" alt="Delete" style="height: 30px;width:80%;background:white;"></button>
//              </div>
//          `;
//     });
//     cartContent.innerHTML += `<div>Total Price: ₹${totalPrice.toFixed(2)}</div>`;
// }
// function updateCartCount() {
//     document.getElementById('cartCount').textContent = cartItems.length;
// }

// function updateTotalPrice() {
//     let totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
//     document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
// }

// document.querySelector('.cart-icon').addEventListener('click', () => {
//     updateCartModal();
//     $('#cartModal').modal('show');
// });

// function confirmOrder() {
//     if (cartItems.length==0){
//         alert("please first add items!");
//         return;
//     }
//     alert("order confirmed")
//     cartItems = [];
//     updateCartCount();
//     updateTotalPrice();
//     updateCartModal();
// }


const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.navlinks');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('navlinks-active');
});

let cartItems = [];

function message(itemName) {
    $('#cartCount').text(cartItems.length);
    $('#addToCartPopup .modal-body').text(itemName + ' has been added to your cart.');
    // Show popup message
    $('#addToCartPopup').modal('show');
    setTimeout(function () {
        $('#addToCartPopup').modal('hide');
    }, 2000);
}

function addToCart(itemName, itemPrice) {
    let existingItem = cartItems.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCartCount();
    updateTotalPrice();
    message(itemName);
}

function removeFromCart(itemName) {
    let itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCartModal();
        updateCartCount();
        updateTotalPrice();
    }
}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCartModal();
    updateTotalPrice();
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCartModal();
        updateTotalPrice();
    }
}

function updateCartModal() {
    let cartContent = document.getElementById("cartContent");
    cartContent.innerHTML = "";
    let baseUrl = "images/";
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        let price = item.price * item.quantity;
        totalPrice += price;
        cartContent.innerHTML += `
            <div>
                <img src="${baseUrl}${item.name}.png" alt="${item.name}">
                <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')"><img src="images/delete.png" alt="Delete" style="height: 30px;width:80%;background:white;"></button>
            </div>
        `;
    });
    cartContent.innerHTML += `<div>Total Price: ₹${totalPrice.toFixed(2)}</div>`;
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

function updateTotalPrice() {
    let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

document.querySelector('.cart-icon').addEventListener('click', () => {
    updateCartModal();
    $('#cartModal').modal('show');
});

function confirmOrder() {
    if (cartItems.length == 0) {
        alert("Please add items to your cart first!");
        return;
    }
    window.open("buy.html")
    cartItems = [];
    updateCartCount();
    updateTotalPrice();
    updateCartModal();
}
