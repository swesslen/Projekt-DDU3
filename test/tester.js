const htmlBody = document.querySelector("body");

const requestsArray = [];

const urlCreate = new URL("http://localhost:8000/create");
const urlLogin = new URL("http://localhost:8000/login");
const urlLoginDashboard = new URL("http://localhost:8000/login/dashboard");
const urlGetUserJokes = new URL("http://localhost:8000/favoriteJokes/user?name=markus");
const urlSendJoke = new URL("http://localhost:8000/login/dashboard/collection?username=markus");
const urlSendJokeButFail = new URL("http://localhost:8000/login/dashboard/collection?username=korgkingen");
const urlSendJokeNoName = new URL("http://localhost:8000/login/dashboard/collection");

//Endpoint: "/create"
// Status: 200
async function req1() {
    const body = {
        name: "Testbert",
        password: "Testing1"
    };
    try {
        const response = await fetch(urlCreate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlCreate.pathname,
            method: "POST",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
};
requestsArray.push(req1);

//status 400
async function req2() {
    const body = {
        name: "Testbert2",
        password: ""
    };
    try {
        const response = await fetch(urlCreate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlCreate.pathname,
            method: "POST",
            expectedStatus: 400
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req2);

//Status 409
async function req3() {
    const body = {
        name: "test",
        password: "123"
    };
    try {
        const response = await fetch(urlCreate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlCreate.pathname,
            method: "POST",
            expectedStatus: 409
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req3);

//Status 422
async function req4() {
    const body = {
        name: "testis",
        password: "a"
    };
    try {
        const response = await fetch(urlCreate, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlCreate.pathname,
            method: "POST",
            expectedStatus: 422
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req4);

//Endpoint: "/login"
//Status 200
async function req5() {
    const body = {
        name: "test",
        password: "123"
    };
    try {
        const response = await fetch(urlLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlLogin.pathname,
            method: "POST",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req5);

//Status 400
async function req6() {
    const body = {
        name: "Testbert",
        password: ""
    };
    try {
        const response = await fetch(urlLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlLogin.pathname,
            method: "POST",
            expectedStatus: 400
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req6);

//Status 401
async function req7() {
    const body = {
        name: "EnSvampISkogen",
        password: "1SvampISkogen"
    };
    try {
        const response = await fetch(urlLogin, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlLogin.pathname,
            method: "POST",
            expectedStatus: 401
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req7);

//Endpoint: "/login/dashboard"
//Status 200

async function req8() {
    const body = {
        name: "elias",
        joke: {
            joke: "Varför gick fisken över vägen? Hitta nemo",
            status: "favorite"
        }
    };
    try {
        const response = await fetch(urlLoginDashboard, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlLoginDashboard.pathname,
            method: "PATCH",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req8);

//Status 409
async function req9() {
    const body = {
        name: "markus",
        joke: "A guy walked into a bar, and lost the limbo contest."
    };
    try {
        const response = await fetch(urlLoginDashboard, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlLoginDashboard.pathname,
            method: "PATCH",
            expectedStatus: 409
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req9);

//Endpoint: "/favouritJokes/user?name=${user.name}"
//Status 200
async function req10() {
    try {
        const response = await fetch(urlGetUserJokes);
        const resource = await response.json();
        const requestInfo = {
            path: urlGetUserJokes.pathname,
            method: "GET",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req10);

//Endpoint: "/login/dashboard/collection" - Method: "POST"
//Status 200
async function req11() {
    const body = {
        joke: "Ett skämt",
        status: "received"
    };
    try {
        const response = await fetch(urlSendJoke, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJoke.pathname,
            method: "POST",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req11);

//Status 404
async function req12() {
    const body = {
        joke: "Ett skämt",
        status: "received"
    };
    try {
        const response = await fetch(urlSendJokeButFail, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJokeButFail.pathname,
            method: "POST",
            expectedStatus: 404
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req12);

//Status 400
async function req13() {
    const body = {
        joke: "Ett skämt",
        status: "received"
    };
    try {
        const response = await fetch(urlSendJokeNoName, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJokeNoName.pathname,
            method: "POST",
            expectedStatus: 400
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req13);

//Method - "DELETE"
//Status 200
async function req14() {
    const body = {
        name: "test",
        joke: "Ett skämt"
    };
    try {
        const response = await fetch(urlSendJoke, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJoke.pathname,
            method: "DELETE",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req14);

//Status 404
async function req15() {
    const body = {
        name: "test",
        joke: "En skämt"
    };
    try {
        const response = await fetch(urlSendJoke, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJoke.pathname,
            method: "DELETE",
            expectedStatus: 404
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req15);

//Method - "PUT"
//Status 200
async function req16() {
    const body = {
        joke: "I'm reading an anti-gravity book, and I just can't put it down!",
        status: "received"
    };
    try {
        const response = await fetch(urlSendJokeNoName, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJokeNoName.pathname,
            method: "PUT",
            expectedStatus: 200
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req16);

//Status 404
async function req17() {
    const body = {
        joke: "En skämt",
        status: "favorite"
    };
    try {
        const response = await fetch(urlSendJokeNoName, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const resource = await response.json();
        const requestInfo = {
            path: urlSendJokeNoName.pathname,
            method: "PUT",
            expectedStatus: 404
        };
        return [requestInfo, response.status, resource.message ? resource.message : JSON.stringify(resource)];
    } catch (error) {
        console.error("Fel:", error);
    }
}
requestsArray.push(req17);

let counter = 1;
async function fetchOneByOne() {
    let i = 1;
    for (let requestFunction of requestsArray) {
        console.log(i);
        i++;
        const divInfo = document.createElement("div");
        const divStatus = document.createElement("div");
        const divMessage = document.createElement("div");

        const responseArray = await requestFunction();
        const info = responseArray[0];
        const status = responseArray[1];
        const message = responseArray[2];

        divInfo.textContent = `[#${counter}] Pathway: ${info.path}, Method: ${info.method}, Expected Status: ${info.expectedStatus}`;
        divStatus.textContent = `Status: ${status}`;
        divMessage.textContent = message;

        divInfo.classList.add("request-info");

        htmlBody.append(divInfo);
        htmlBody.append(divStatus);
        htmlBody.append(divMessage);

        counter++;
    }
    return;
}
fetchOneByOne();