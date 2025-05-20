let createButton = document.getElementById("create-account-button");
let inputPassword = document.getElementById("login-password");
let inputName = document.getElementById("login-name")
let confirmLoginPassword = document.getElementById("confirm-login-password");

createButton.addEventListener("click", function(){
    let inputNa = inputName.value;
    let inputPass = inputPassword.value;
    let request = new Request(`http://0.0.0.0:8000/create`,{
        method: "POST",
        body: JSON.stringify({name: inputNa, password: inputPass}),
        headers: {"Content-Type": "application/json"}
    })
    fetch(request);
    
})
