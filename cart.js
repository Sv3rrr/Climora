document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout');

    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {
            if (typeof item.price !== 'number') {
                console.error(`Item at index ${index} has an invalid price:`, item);
                return;
            }

            totalItems++;
            totalPrice += item.price;

            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <button class="cart-item-remove" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        cartCountElement.textContent = totalItems;
    }

    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    checkoutButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        } else {
            // Redirect to the checkout page
            window.location.href = 'checkout.html';
        }
    });

    updateCart();
});