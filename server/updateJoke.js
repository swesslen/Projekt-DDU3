export async function updateJoke(resource) {
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);
    for(let user of jsonData) {

        for(let jokeObject of user.favoriteJokes) {
            if(jokeObject.joke === resource.joke && jokeObject.status === "received") {
                jokeObject.status = resource.status;
                await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
                return true
            }
        }
    }
    return false
}

