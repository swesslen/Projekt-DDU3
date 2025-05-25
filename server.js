import { addToTheJsonFileFunction } from "./addToTheJsonFileFunction.js"
import { addFavoriteJokeToToUsersKey } from "./addFavoriteJokeToToUsersKey.js"
import { classForCheckPasswordAndName } from "./classForCheckPasswordAndName.js"
async function handler(request) {
    let url = new URL(request.url);
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString)

    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json");
    headersCors.set("Access-Control-Allow-Origin", "*");
    headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH");
    headersCors.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCors
        });
    }
    if (url.pathname === "/login/dashboard") {
        if (request.method === "PATCH") {
            let resource = await request.json()
            for (let user of jsonData) {
                if (user.name === resource.name) {
                    for (let joke of user.favoriteJokes) {
                        if (joke === resource.joke) {
                            let response = new Response(JSON.stringify({ message: "The joke is already in your collection" }), {
                                status: 409,
                                headers: headersCors
                            })
                            return response

                        }
                    }
                    addFavoriteJokeToToUsersKey(resource.name, resource.joke)
                    let response = new Response(JSON.stringify({ message: "The joke was added successfully" }), {
                        status: 200,
                        headers: headersCors
                    })
                    return response
                }
            }

        }
    }

    if (url.pathname === "/create") {
        if (request.method === "POST") {
            let resource = await request.json(); // { name: "test", password: "123" } t.ex
            const missingNameOrPassword = !(resource.name.trim() && resource.password.trim());
            if (missingNameOrPassword) {
                let response = new Response(JSON.stringify({ message: "Missing username or password" }), {
                    status: 400,
                    headers: headersCors
                });
                return response;
            }
            for (let user of jsonData) {
                if (user.name == resource.name) {
                    let response = new Response(JSON.stringify({ message: "User already exist" }), {
                        status: 409,
                        headers: headersCors
                    });
                    return response;
                }
            }
            let classForCheckPasswordAnswerAndName = classForCheckPasswordAndName(resource) // true eller false
            if (!classForCheckPasswordAnswerAndName) {
                let response = new Response(JSON.stringify({ message: "The password does not meet the requirement " }), {
                    status: 422,
                    headers: headersCors
                });
                return response;
            }

            addToTheJsonFileFunction(resource);
            let response = new Response(JSON.stringify({ message: "Account created successfully!" }), {
                status: 200,
                headers: headersCors
            });
            return response;
        }
    }

    if (url.pathname === "/login") {

        if (request.method === "POST") {
            let resource = await request.json(); // { name: "test", password: "123" } t.ex
            const missingNameOrPassword = !(resource.name.trim() && resource.password.trim());
            if (missingNameOrPassword) {
                let response = new Response(JSON.stringify({ message: "Missing username or password" }), {
                    status: 400,
                    headers: headersCors
                });
                return response;
            }
            let existingUser = jsonData.find(user => user.name == resource.name && user.password == resource.password);
            if (existingUser) {
                let response = new Response(JSON.stringify(existingUser), {
                    status: 200,
                    headers: headersCors
                });
                return response;
            } else {
                let response = new Response(JSON.stringify({ message: "Incorret username or password" }), {
                    status: 401,
                    headers: headersCors
                });
                return response;
            }
        }
    }
    return new Response(JSON.stringify({ message: "Not found" }), {
        status: 404,
        headers: headersCors,
    });
}

Deno.serve(handler);