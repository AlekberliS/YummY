function validateForm() {
  let cardNumber = document.getElementById("cardNumber").value;
  let expirationDate = document.getElementById("expirationDate").value;
  let financialCode = document.getElementById("financialCode").value;


  if (!/^\d{16}$/.test(cardNumber)) {
    alert("Card number must be 16 characters long. And only numbers");
    return false;
  }

  let dateRegex = /^(0[1-9]|1[0-2])\/(\d{4})$/;


  
  let expDateInput = expirationDate.split('/');
  if (!dateRegex.test(expirationDate) || expDateInput.length !== 2) {
    alert("Please use a valid date format (MM/YYYY) for the expiration date.");
    return false;
  }

  let expDate = new Date(expDateInput[1], expDateInput[0] - 1, 1);


  if (
    expDate <= today ||
    (expDate.getFullYear() === today.getFullYear() && expDate.getMonth() === today.getMonth() && expDate.getDate() < today.getDate())
  ) {
    alert("The expiration date should not be in the past and should be at least one month ahead.");
    return false;
  }


  if (!financialCode.length !== 3) {
    alert("The financial code must be 3 digits long.");
    return false;
  }
  else{
     return true;
  }
 
}
