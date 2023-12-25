document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();


    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;


    if (!validateEmail(email)) {
        alertErrorMessage('Invalid email format!');
        return;
    }


    if (name === '' || subject === '' || message === '') {
        alertErrorMessage('Please fill in all required fields!');
        return;
    }


    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
});


function validateEmail(email) {
    let emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}


