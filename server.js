import { addToTheJsonFileFunction } from "./addToTheJsonFileFunction.js"
import { addFavoriteJokeToToUsersKey } from "./addFavoriteJokeToToUsersKey.js"
import { classForCheckPasswordAndName } from "./classForCheckPasswordAndName.js"
import { deleteDataFromJsonFile } from "./deleteDataFromJsonFile.js"
async function handler(request) {
    let url = new URL(request.url);
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);

    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json")
    headersCors.set("Access-Control-Allow-Origin", "*");
    headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH");
    headersCors.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCors
        });
    }

    if (url.pathname.startsWith("/favoriteJokes/user") && url.searchParams.has("name")) {
        if (request.method === "GET") {
            const user = jsonData.find(user => user.name === url.searchParams.get("name"));
            const body = user.favoriteJokes;
            return new Response(JSON.stringify({ message: body }), {
                status: 200,
                headers: headersCors
            });
        }
    }

    if (url.pathname === "/login/dashboard/collection") {
        if (request.method === "POST") {
            if (url.searchParams.has("username")) {
                const name = url.searchParams.get("username");
                const resource = await request.json();
                console.log("Skämtet som skickas:", resource);

                for (let user of jsonData) {
                    if (user.name === name) {
                        user.favoriteJokes.unshift(resource);

                        await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));

                        const response = new Response(JSON.stringify("Joke was sent to user"), {
                            status: 200,
                            headers: headersCors
                        });
                        return response;
                    }
                }

                return new Response(JSON.stringify("User not found"), {
                    status: 404,
                    headers: headersCors
                });
            }

            return new Response(JSON.stringify("Missing ?username= in URL"), {
                status: 400,
                headers: headersCors
            });
        }
        if (request.method === "DELETE") {
            let resource = await request.json();
            console.log(resource)
            let didWeFindTheJoke = await deleteDataFromJsonFile(resource);
            console.log(didWeFindTheJoke)
            if (didWeFindTheJoke === true) {
                let response = new Response(JSON.stringify({ message: "Delete " }), {
                    status: 200,
                    headers: headersCors
                })
                return response
            } else {
                let response = new Response(JSON.stringify({ message: "Not found to delete " }), {
                    status: 404,
                    headers: headersCors
                })
                return response

            }
        }
    }
    if (url.pathname === "/login/dashboard") {
        if (request.method === "PATCH") {
            let resource = await request.json()
            for (let user of jsonData) {
                if (user.name === resource.name) {
                    for (let joke of user.favoriteJokes) {
                        if (joke === resource.joke.joke) {
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
            let classForCheckPasswordAnswerAndName = classForCheckPasswordAndName(resource) // true eller false
            console.log(classForCheckPasswordAnswerAndName)
            if (resource.name == "" || resource.password == "") {
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
            if (resource.name == "" || resource.password == "") {
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

}

Deno.serve(handler);