export async function addFavoriteJokeToUser(userName, joke) {
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString)
    for (let user of jsonData) {
        if (userName === user.name) {
            user.favoriteJokes.push(joke)
        }
    }
    await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));


}