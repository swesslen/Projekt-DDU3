function handler(request) {
    let url = new URL(request.url);

    if(url.pathname = "/create") {
        let response = new Response(null, {
            status: 200
        })
        return response;
    }

}

Deno.serve(handler);