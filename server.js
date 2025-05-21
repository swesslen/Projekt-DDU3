import { addToTheJsonFileFunction } from "./addToTheJsonFileFunction.js"


async function handler(request) {
    let url = new URL(request.url);
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString)

    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json")
    headersCors.set("access-control-allow-origin", "*");
    headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCors.set("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headersCors
        });
    }

    if (url.pathname === "/create") {
        if (request.method === "POST") {
            let resource = await request.json(); // { name: "test", password: "123" } t.ex
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
            }
        }
    }
}

Deno.serve(handler);