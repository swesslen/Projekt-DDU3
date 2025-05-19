let createButton = document.getElementById("create-account-button");
let inputPassword = document.getElementById("login-password");
let inputName = document.getElementById("login-name")
let confirmLoginPassword = document.getElementById("confirm-login-password");

createButton.addEventListener("click", function(){
    if(inputPassword.value === confirmLoginPassword.value) {
        let inputNa = inputName.value;
        let inputPass = inputPassword.value;
        let request = new Request(`http://0.0.0.0:8000/create`,{
            method: "POST",
            body: JSON.stringify({name: inputNa, password: inputPass}),
            headers: {"Content-Type": "json/application"}
        })
        fetch(request);
    }
})
