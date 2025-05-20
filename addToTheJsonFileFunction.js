export function addToTheJsonFileFunction(resource) {
    const filePath = "./database.json";
    const jsonString = Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);
    const newObject = { 
        name: resource.name, 
        password: resource.password, 
        favoriteJokes: [],
        img: ""  
    };
    jsonData.push(newObject);
    Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
}