async function handler(request) {
    let url = new URL(request.url);
    console.log(request)


    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json")
    headersCors.set("access-control-allow-origin", "*");
    
    if(url.pathname === "/create") {
        console.log("enfw")
        if (request.method === "OPTIONS") { // Måste ha annars funkar ej
            headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
            headersCors.set("Access-Control-Allow-Headers", "Content-Type");
            return new Response(null, {
              status: 204,
              headers: headersCors
            });
        }
        if(request.method === "POST") {
            let resource = await request.json(); // { name: "test", password: "123" } t.ex
            console.log(resource)
            let response = new Response(JSON.stringify({message: "Account created successfully!"}), {
                status: 200,
                headers: headersCors
            });
            return response;
        }
    }

}

Deno.serve(handler);