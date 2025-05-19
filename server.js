function handler(request) {
    let url = request.url;

    if(url.pathname = "/login") {
        let response = new Response(null, {
            status: 200
        })
        return response;
    }

}

Deno.serve(handler);