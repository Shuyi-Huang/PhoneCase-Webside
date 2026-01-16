// Header Scroll Detector
document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.header-background');
    var nav = document.querySelector('#nav'); 

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Trigger change after scrolling past 100px
            header.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }
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

// Additional interactivity (e.g., animations on logo hover)
document.getElementById('logo').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

document.getElementById('logo').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
