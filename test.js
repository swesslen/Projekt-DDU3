const filePath = "./database.json";


const jsonString = await Deno.readTextFile(filePath);

// Parsar JSON-strängen till ett objekt
const jsonData = JSON.parse(jsonString)

const newObject = { name: 3, password: "123" };
jsonData.push(newObject); // Om jsonData är en array

// Skriv tillbaka den uppdaterade JSON-datan till filen
await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));

console.log(jsonData);
