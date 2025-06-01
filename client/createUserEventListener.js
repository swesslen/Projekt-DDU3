let createButton = document.getElementById("create-account-button");
let inputPassword = document.getElementById("login-password");
let inputName = document.getElementById("login-name")
let confirmLoginPassword = document.getElementById("confirm-login-password");
let confirmTheAccount = document.getElementById("confirmTheAccount");

createButton.addEventListener("click", function () {
    let inputNa = inputName.value;
    let inputPass = inputPassword.value;
    let request = new Request(`http://localhost:8000/create`, {
        method: "POST",
        body: JSON.stringify({ name: inputNa, password: inputPass }),
        headers: { "Content-Type": "application/json" }
    })
    fetch(request).then(fulfill, rejectHandler)

    function fulfill(response) {
        if (response.status === 200) {
            confirmTheAccount.textContent = "Account was created successfully";
            confirmTheAccount.style.color = "lightgreen";
        }
        if (response.status === 400) {
            confirmTheAccount.textContent = "Missing username or password";
            confirmTheAccount.style.color = "red";
        }
        if (response.status === 409) {
            confirmTheAccount.textContent = "This username already exists";
            confirmTheAccount.style.color = "red";
        }
        if (response.status === 422) {
            confirmTheAccount.textContent = "The password does not meet the requirements. Username must be least 3 letters and password at least 4 letters and include a capital letter and a number.";
            confirmTheAccount.style.color = "red";
        }
    }
    function rejectHandler(error) {
        confirmTheAccount.textContent = "Network error";
        confirmTheAccount.style.color = "red";
    }

})
