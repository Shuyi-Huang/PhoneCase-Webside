// highlight each input box
$(document).ready(function() {
  $('input, select').on('mouseenter', function() {
    $(this).css('border-color', '#A2571A');
  });
  $('input, select').on('mouseleave', function() {
    $(this).css('border-color', '#2C1300');
  });


// only numbers can be entered in Postcode, phone, card number, security code
  $('#postcode, #phone, #card-number, #security-code').on('input', function() {
    if (this.value.match(/[^0-9]/)) {
      this.setCustomValidity('Please enter numbers only');
      this.reportValidity();
    } else {
      this.setCustomValidity('');
    }
  });

  // checking if it contains "@" and ".com"
  $('#email').on('input', function() {
    const email = $(this).val();
    const isValid = email.includes('@') && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
    if (!isValid) {
      this.setCustomValidity('Please enter a valid email address');
    } else {
      this.setCustomValidity('');
    }
    this.reportValidity();
  });

})