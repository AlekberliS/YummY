function register() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let name = document.getElementById("name").value;

  if (
    !validatePassword(password) ||
    !validateEmail(email) ||
    !validateName(name) ||
    !confirmPasswordMatch(password, confirmPassword)
  ) {
    return;
  }

  let user = {
    email: email,
    password: password,
    name: name,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Registration successful!");
}

function validatePassword(password) {
  let passwordRegex = /^(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 6 characters long and contain at least one uppercase letter."
    );
    return false;
  }
  return true;
}

function validateEmail(email) {
 
  let emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false;
  }
  return true;
}

function validateName(name) {
  if (name.length < 5) {
    alert("Name must be at least 5 characters long.");
    return false;
  }

  let storedUser = localStorage.getItem("user");
  if (storedUser) {
    storedUser = JSON.parse(storedUser);
    if (name === storedUser.name) {
      alert("This name is already registered. Please choose another name.");
      return false;
    }
  }

  return true;
}

function confirmPasswordMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }
  return true;
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("showPassword")
    .addEventListener("change", function () {
      let passwordInput = document.getElementById("password");
      passwordInput.type = this.checked ? "text" : "password";
    });
});
