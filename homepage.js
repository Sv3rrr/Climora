function addToCart(productName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        name: productName,
        price: getProductPrice(productName),
        image: getProductImage(productName),
        description: getProductDescription(productName)
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${productName} has been added to your cart!`);
    updateCartCount();
}

function getProductPrice(productName) {
    const prices = {
        'Dual Temperature Pillow': 149.00,
        'Cold Pillow': 119.00,
        'Heat Pillow': 119.00
    };
    return prices[productName];
}

function getProductImage(productName) {
    const images = {
        'Dual Temperature Pillow': 'images/dual-pillow.jpg',
        'Cold Pillow': 'images/cold-pillow.jpg',
        'Heat Pillow': 'images/heat-pillow.jpg'
    };
    return images[productName];
}

function getProductDescription(productName) {
    const descriptions = {
        'Dual Temperature Pillow': 'The best of both worlds – hot or cold whenever you need it.',
        'Cold Pillow': 'Stay cool and comfortable all night long.',
        'Heat Pillow': 'Relax and unwind with calming scents.'
    };
    return descriptions[productName];
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Slight delay to trigger the transition
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500); // Match this duration with the CSS transition duration
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        setTimeout(() => {
            showNotification('Thank you for contacting us! We will get back to you soon.');
            document.getElementById('contact-form').reset();
        }, 1000);
    } else {
        showNotification('Please fill out all fields.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    document.querySelectorAll('.btn.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product-name');
            addToCart(productName);
        });
    });
});