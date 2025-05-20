let createButton = document.getElementById("create-account-button");
let inputPassword = document.getElementById("login-password");
let inputName = document.getElementById("login-name")
let confirmLoginPassword = document.getElementById("confirm-login-password");
let confirmTheAccount = document.getElementById("confirmTheAccount");

createButton.addEventListener("click", function(){
    let inputNa = inputName.value;
    let inputPass = inputPassword.value;
    let request = new Request(`http://0.0.0.0:8000/create`,{
        method: "POST",
        body: JSON.stringify({name: inputNa, password: inputPass}),
        headers: {"Content-Type": "application/json"}
    })
    fetch(request).then(fulfill, rejectHandler)

    function fulfill(response) {
        if(response.status === 200) {
            confirmTheAccount.textContent = "Account was succefull created";
            confirmTheAccount.style.color = "lightgreen";
        }
        if(response.status === 400) {
            confirmTheAccount.textContent = "Missing username or password";
            confirmTheAccount.style.color = "red";
        }
        if(response.status === 409) {
            confirmTheAccount.textContent = "User already exist with that name";
            confirmTheAccount.style.color = "red";
        }
    }
    function rejectHandler(error) {
        confirmTheAccount.textContent = error;
    }
    
})
