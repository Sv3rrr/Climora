document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.checkout-form');
    const itemCountElement = document.getElementById('checkout-item-count');
    const totalPriceElement = document.getElementById('checkout-total-price');

    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update order summary
    function updateOrderSummary() {
        const itemCount = cart.length;
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);

        itemCountElement.textContent = itemCount;
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;
        const country = document.getElementById('country').value;
        const payment = document.querySelector('input[name="payment"]:checked').value;

        if (name && email && address && city && state && zip && country && payment) {
            // Redirect to the respective payment page
            switch (payment) {
                case 'visa':
                    window.location.href = 'visa-payment.html';
                    break;
                case 'mastercard':
                    window.location.href = 'mastercard-payment.html';
                    break;
                case 'paypal':
                    window.location.href = 'paypal-payment.html';
                    break;
                case 'amex':
                    window.location.href = 'amex-payment.html';
                    break;
                default:
                    alert('Please select a valid payment method.');
            }
        } else {
            alert('Please fill out all fields.');
        }
    });

    updateOrderSummary();
});