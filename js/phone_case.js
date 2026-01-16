document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const activeImage = document.querySelector('.active-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            activeImage.src = this.src;
            activeImage.alt = this.alt;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cardFront = document.querySelector('.active-image'); // Assuming this is your main image area.
    const colorSelect = document.getElementById('color');

    colorSelect.addEventListener('change', function() {
        const imageMap = {
            'clear': 'images/products/clear_case.WebP',
            'black': 'images/products/black_case.WebP',
            'blue': 'images/products/blue_case.WebP'
        };
        cardFront.src = imageMap[this.value];
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const costInput = document.querySelector('.price span'); // Ensure this selects correctly.
    const unitPrice = 39.99;

    quantityInput.addEventListener('input', function() {
        const newCost = parseInt(this.value, 10) * unitPrice;
        costInput.textContent = `$${newCost.toFixed(2)}`; // Ensure it formats to two decimal places.
    });
});

// Event listener for form submission
document.getElementById('SubscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var messageSection = document.getElementById('subscription-message');

    // Validate email
    if (!validateEmail(email)) {
        messageSection.innerHTML = 'Please enter a valid email address.';
        messageSection.style.color = '#A2571A';
        return;
    }

    // Collect interests
    var interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(function(checkbox) {
        return checkbox.value;
    }).join(', ');

    // Prepare data to be sent to Google Apps Script
    var formData = {
        name: name,
        email: email,
        interests: interests
    };

    // Send data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxjgqXd-nms5QZyrkLTGTV82UaF4OSvX2lNpOsF6W-S_3buuXgISDHI__FpLyLCYx3E/exec', {
        method: 'POST',
        mode: 'no-cors', // To avoid CORS issues
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        messageSection.innerHTML = 'Thank you for subscribing, ' + name + '! We will send updates on products to ' + email + '.';
        messageSection.style.color = '#A2571A';
    }).catch(error => {
        messageSection.innerHTML = 'There was an error processing your subscription. Please try again.';
        messageSection.style.color = '#A2571A';
    });
});

// Email validation function
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
    return re.test(String(email).toLowerCase());
}
