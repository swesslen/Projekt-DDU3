async function handler(request) {
    let url = new URL(request.url);


    const headersCors = new Headers();
    headersCors.set("Content-Type", "application/json")
    headersCors.set("access-control-allow-origin", "*");

    if(url.pathname = "/create") {
        if(request.method === "POST") {
            let resource = await request.json();
            console.log(resource)
            let response = new Response(null, {
                status: 200,
                headers: headersCors
            })
            return response;
        }
    }

}

Deno.serve(handler);