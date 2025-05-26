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
        jokeDiv.setAttribute("class", "favorite")

        let buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("class", "buttonDiv")
        jokeDiv.appendChild(buttonDiv);

        let sendButton = document.createElement("button");
        sendButton.setAttribute("class", "sendButton");
        sendButton.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" stroke="#3a5b91" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        buttonDiv.appendChild(sendButton);

        let removeButton = document.createElement("button");
        removeButton.setAttribute("class", "removeButton");
        removeButton.innerHTML = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
</svg>`;
        buttonDiv.appendChild(removeButton);
    }

    styleRecieved(jokeDiv) {
        jokeDiv.setAttribute("class", "recieved")

        let buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("class", "buttonDiv")
        jokeDiv.appendChild(buttonDiv);

        let acceptButton = document.createElement("button");
        acceptButton.setAttribute("class", "acceptButton");
        acceptButton.innerHTML = `<svg stroke="#4e864e" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z" fill="#000000"/>
</svg>`;
        buttonDiv.appendChild(acceptButton);

        let removeButton = document.createElement("button");
        removeButton.setAttribute("class", "removeButton");
        removeButton.innerHTML = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
</svg>`;
        buttonDiv.appendChild(removeButton);
    }

}