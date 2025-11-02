
// Get form elements
const form = document.getElementById('formContainer');
const submitButton = document.querySelector('button[type="submit"]');
const creditCardNumber = document.getElementById('creditCardNumber');
const cardHolderName = document.getElementById('cardHolderName');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const cvcInput = document.getElementById('cvc/cvv');

// Move submit button inside form
if (submitButton && submitButton.parentElement !== form) {
    form.appendChild(submitButton);
}

// Format credit card number as user types (add space every 4 digits)
creditCardNumber.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove any non-digits
    value = value.replace(/\D/g, '');
    // Add space every 4 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    // Limit to 16 digits
    value = value.slice(0, 19); // 16 digits plus 3 spaces
    // Update input value
    e.target.value = value;
});

// Validate month input (01-12)
monthInput.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove any non-digits
    value = value.replace(/\D/g, '');
    // Ensure month is between 1-12
    if (value.length >= 2) {
        const month = parseInt(value.slice(0, 2));
        if (month < 1) value = '01';
        if (month > 12) value = '12';
    }
    // Update input value
    e.target.value = value.slice(0, 2);
});

// Validate year input (current year and future)
yearInput.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove any non-digits
    value = value.replace(/\D/g, '');
    // Get current year's last two digits
    const currentYear = new Date().getFullYear() % 100;
    if (value.length >= 2) {
        const year = parseInt(value.slice(0, 2));
        if (year < currentYear) value = currentYear.toString();
    }
    // Update input value
    e.target.value = value.slice(0, 2);
});

// Validate CVC/CVV (3-4 digits)
cvcInput.addEventListener('input', (e) => {
    let value = e.target.value;
    // Remove any non-digits
    value = value.replace(/\D/g, '');
    // Limit to 4 digits
    e.target.value = value.slice(0, 4);
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errorMsg = '';

    // Validate credit card number (16 digits)
    const cardNum = creditCardNumber.value.replace(/\s/g, '');
    if (cardNum.length !== 16) {
        errorMsg += 'Please enter a valid 16-digit credit card number\n';
    }

    // Validate name
    if (cardHolderName.value.trim() === '') {
        errorMsg += 'Please enter the card holder name\n';
    }

    // Validate expiration date
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!month || !year) {
        errorMsg += 'Please enter a valid expiration date\n';
    } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errorMsg += 'Card has expired\n';
    }

    // Validate CVC/CVV
    if (cvcInput.value.length < 3) {
        errorMsg += 'Please enter a valid CVC/CVV\n';
    }

    if (errorMsg) {
        alert(errorMsg);
        return;
    }

    // If all validations pass
    alert('Payment processed successfully!');
    form.reset();
});
          