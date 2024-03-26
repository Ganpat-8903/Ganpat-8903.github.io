// JavaScript code to toggle navigation menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.navlinks');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('navlinks-active');
});

let cartItems = [];

function addToCart(itemName, itemPrice) {
    cartItems.push({ name: itemName, price: itemPrice });
    updateCartCount();
    updateTotalPrice();
    alert(itemName + " added to cart!")
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartModal();
    updateCartCount();
    updateTotalPrice();
}

function updateCartModal() {
    let cartContent = document.getElementById("cartContent");
    cartContent.innerHTML = "";
    let baseUrl = "images/";
    let totalPrice = 0;
    cartItems.forEach((item, index) => {
        let price = item.price;
        totalPrice += price;
        cartContent.innerHTML += `
             <div>
                 <img src="${baseUrl}${item.name}.png" alt="${item.name}">
                 ${item.name} - ₹${price} 
                 <button class="remove-btn" onclick="removeFromCart(${index})"><img src="images/delete.png" alt="Delete" style="height: 30px;width:80%;background:white;"></button>
             </div>
         `;
    });
    cartContent.innerHTML += `<div>Total Price: ₹${totalPrice.toFixed(2)}</div>`;
}
function updateCartCount() {
    document.getElementById('cartCount').textContent = cartItems.length;
}

function updateTotalPrice() {
    let totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

document.querySelector('.cart-icon').addEventListener('click', () => {
    updateCartModal();
    $('#cartModal').modal('show');
});

function confirmOrder() {
    if (cartItems.length==0){
        alert("please first add items!");
        return;
    }
    alert('Your order has been confirmed!');
    $('#cartModal').modal('hide');
    cartItems = [];
    updateCartCount();
    updateTotalPrice();
    updateCartModal();
}

