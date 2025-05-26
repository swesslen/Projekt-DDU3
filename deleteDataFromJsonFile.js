export async function deleteDataFromJsonFile(resource) {
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);
    for(let user of jsonData) {
        const jokeIndex = user.favoriteJokes.findIndex(jokeObject => jokeObject.joke === resource.joke)
        if(jokeIndex !== -1) {
            user.favoriteJokes.splice(jokeIndex,1)
            await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
            return true
        }
    }
}