let loginButton = document.getElementById("login-button");
let inputPassword = document.getElementById("login-password");
let inputName = document.getElementById("login-name");
let errorMessage = document.getElementById("error-message");

let loginSection = document.getElementById("login-section");
let dashboredSection = document.getElementById("dashbored-section");

let collectionButton = document.getElementById("my-collection");
let generateJokeButton = document.getElementById("generate-joke");
let testTextJoke = document.getElementById("test-text-joke");

let collectionSection = document.getElementById("collection-section");
let backToStartButton = document.getElementById("back-to-start");


loginButton.addEventListener("click", function () {
    let inputNa = inputName.value;
    let inputPass = inputPassword.value;
    let request = new Request(`http://0.0.0.0:8000/login`, {
        method: "POST",
        body: JSON.stringify({ name: inputNa, password: inputPass }),
        headers: { "Content-Type": "application/json" }
    })
    fetch(request).then(fulfill)

    async function fulfill(response) {
        if (response.status === 200) {
            let resource = await response.json();
            loadDashbored(resource);
        }
        if (response.status === 400) {
            errorMessage.textContent = "Missing username or password";
            errorMessage.style.color = "red";
        }
        if (response.status === 409) {
            confirmTheAccount.textContent = "User already exist with that name";
            confirmTheAccount.style.color = "red";
        }

    }
})

async function loadDashbored(user) {

    loginSection.style.display = "none";
    dashboredSection.style.display = "flex";
    document.querySelectorAll(".username-display").forEach(name => {
        name.textContent = `${user.name}`;
    });
    const welcomeText = document.getElementById("welcome-text");
    welcomeText.textContent = `Welcome to your Dashbored ${user.name}!`;
    document.querySelectorAll(".profile-picture").forEach(profilePicture => {
        profilePicture.style.background = `url(${user.img})`;
        profilePicture.style.backgroundSize = "cover";
        profilePicture.style.backgroundPosition = "center";
    });
    generateJokeButton.addEventListener("click", async function () {
        let newJoke = await getJoke();
        testTextJoke.textContent = newJoke[0].joke;
    })
}

collectionButton.addEventListener("click", function () {
    dashboredSection.style.display = "none";
    collectionSection.style.display = "flex";
})

async function getJoke() {
    let request = new Request("https://api.api-ninjas.com/v1/dadjokes", {
        headers: { "X-Api-Key": "NPFGbTReNy3OJTogUtFxlw==xe4qs62lBkAY00X9" }
    })
    let response = await fetch(request)
    return await response.json();
}

backToStartButton.addEventListener("click", function () {
    collectionSection.style.display = "none";
    dashboredSection.style.display = "flex";
})