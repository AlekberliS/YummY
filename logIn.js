function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let storedUser = localStorage.getItem('user');

    if (storedUser) {
        storedUser = JSON.parse(storedUser);

        if (email === storedUser.email && password === storedUser.password) {
            alert('Login successful!');
        } else {
            alert('Invalid email or password');
        }
    } else {
        alert('User not found. Please register.');
    }
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('showPassword').addEventListener('change', function() {
        let passwordInput = document.getElementById('password');
        passwordInput.type = this.checked ? 'text' : 'password';
    });
});