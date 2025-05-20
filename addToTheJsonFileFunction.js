export async function addToTheJsonFileFunction(resource) {
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);
    const newObject = { 
        name: resource.name, 
        password: resource.password, 
        favoriteJokes: [],
        img: ""  
    };
    jsonData.push(newObject);
    await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
}