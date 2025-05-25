const htmlBody = document.querySelector("body");

const requestsArray = [];

const urlCreate = new URL("http://localhost:8000/create");
const urlLogin = new URL("http://localhost:8000/login");

//Pathway: "/create"
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
requestsArray.push(req1());

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
requestsArray.push(req2());

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
requestsArray.push(req3());

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
requestsArray.push(req4());

//Pathway: "/login"
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
requestsArray.push(req5());

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
requestsArray.push(req6());

async function fetchOneByOne() {
    for (let request of requestsArray) {
        const divInfo = document.createElement("div");
        const divStatus = document.createElement("div");
        const divMessage = document.createElement("div");

        const responseArray = await request;
        const info = responseArray[0];
        const status = responseArray[1];
        const message = responseArray[2];

        divInfo.textContent = `Pathway: ${info.path}, Method: ${info.method}, Expected Status: ${info.expectedStatus}`;
        divStatus.textContent = `Status: ${status}`;
        divMessage.textContent = message;

        divInfo.classList.add("request-info");

        htmlBody.append(divInfo);
        htmlBody.append(divStatus);
        htmlBody.append(divMessage);
    }
    return;
}
fetchOneByOne();