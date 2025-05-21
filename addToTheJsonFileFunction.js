export async function addToTheJsonFileFunction(resource) {
    const filePath = "./database.json";
    const jsonString = await Deno.readTextFile(filePath);
    const jsonData = JSON.parse(jsonString);
    const imageURL = await getRandomImage();

    const newObject = {
        name: resource.name,
        password: resource.password,
        favoriteJokes: [],
        img: imageURL
    };
    jsonData.push(newObject);
    await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
}

async function getRandomImage() {
    const keywords = ["nature", "city", "mountain", "cat", "forest", "sunset"];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    const response = await fetch(`https://api.pexels.com/v1/search?query=${randomKeyword}&per_page=1&page=${Math.floor(Math.random() * 50) + 1}`, {
        headers: {
            Authorization: 'ih5kOIqkSUQJyIjI8cI0WhR0mN2srwYmotYRaamExi3OGcVkijIuHNoX'
        }
    });

    const photoResource = await response.json();
    const photoUrl = photoResource.photos[0].src.large;
    console.log(photoUrl);
    return photoUrl;
}