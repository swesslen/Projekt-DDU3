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

let AddToCollectionButton = document.getElementById("testButton");
let checkResponseForAddJoke = document.getElementById("checkResponseForAddJoke");

let jokeSection = document.getElementById("joke-section");

let jokeCollection = document.getElementById("joke-collection");



loginButton.addEventListener("click", function () {
    let inputNa = inputName.value;
    let inputPass = inputPassword.value;
    let request = new Request(`http://localhost:8000/login`, {
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
        if (response.status === 401) {
            errorMessage.textContent = "Incorret username or password";
            errorMessage.style.color = "red";
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
    let joke = null;
    generateJokeButton.addEventListener("click", async function () {
        checkResponseForAddJoke.textContent = "";
        let newJoke = await getJoke();
        joke = newJoke;
        testTextJoke.textContent = newJoke.joke;
        jokeSection.style.display = "grid";
        jokeSection.style.gridTemplateColumns = "1fr";
        jokeSection.style.gridTemplateRows = "100px 1fr 1fr"
    })
    AddToCollectionButton.addEventListener("click", async function () { // KNAPP ID
        let request = new Request("http://localhost:8000/login/dashboard", {
            method: "PATCH",
            body: JSON.stringify({ name: user.name, joke: joke }),
            headers: { "Content-Type": "application/json" }
        })
        let response = await fetch(request);

        if (response.status === 200) {
            checkResponseForAddJoke.textContent = "The joke was added successfully";
            checkResponseForAddJoke.style.color = "green";

            // 🆕 Lägg till skämtet lokalt (om det inte redan finns)
            const newJoke = { joke: joke.joke, status: "favorite" };
            const exists = user.favoriteJokes.some(j => j.joke === joke);
            if (!exists) {
                user.favoriteJokes.push(newJoke);
            }

        }
        if (response.status === 409) {
            checkResponseForAddJoke.textContent = "The joke is already in your collection";
            checkResponseForAddJoke.style.color = "red"
        }


    })
    collectionButton.addEventListener("click", function () {
        dashboredSection.style.display = "none";
        collectionSection.style.display = "flex";
        jokeCollection.innerHTML = "";
        for (let joke of user.favoriteJokes) {
            const jokeComponent = new RenderCollection(joke);
            const element = jokeComponent.render();
            jokeCollection.appendChild(element);
        }
    })


    document.querySelectorAll(".profile-picture").forEach(profilePicture => {
        profilePicture.style.background = `url(${user.img})`;
        profilePicture.style.backgroundSize = "cover";
        profilePicture.style.backgroundPosition = "center";
    });
}



async function getJoke() {
    let request = new Request("https://api.api-ninjas.com/v1/dadjokes", {
        headers: { "X-Api-Key": "NPFGbTReNy3OJTogUtFxlw==xe4qs62lBkAY00X9" }
    })
    let response = await fetch(request)
    let resource = await response.json();
    let joke = resource[0];
    joke.status = "favorite";
    return joke;
}

backToStartButton.addEventListener("click", function () {
    collectionSection.style.display = "none";
    dashboredSection.style.display = "flex";
})

class RenderCollection {
    constructor(jokeObject) {
        this.joke = jokeObject.joke;
        this.status = jokeObject.status;
    }

    render() {
        const jokeDiv = document.createElement("div");
        jokeDiv.textContent = this.joke;
        jokeDiv.style.padding = "10px";
        jokeDiv.style.margin = "10px";
        jokeDiv.style.borderRadius = "5px";

        // Anropa metod beroende på status
        if (this.status === "favorite") {
            this.styleFavorite(jokeDiv);
        }

        if (this.status === "recieved") {
            this.styleRecieved(jokeDiv);
        }

        return jokeDiv;
    }

    styleFavorite(jokeDiv) {
        jokeDiv.style.backgroundColor = "red";

        let sendButton = document.createElement("button");
        sendButton.textContent = "Send to friend";
        jokeDiv.appendChild(sendButton);

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove joke";
        jokeDiv.appendChild(removeButton);
    }

    styleRecieved(jokeDiv) {
        jokeDiv.style.backgroundColor = "lightblue";
        jokeDiv.style.color = "black";

        let acceptButton = document.createElement("button");
        acceptButton.textContent = "Save joke";
        jokeDiv.appendChild(acceptButton);

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove joke";
        jokeDiv.appendChild(removeButton);
    }

}