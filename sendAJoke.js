function makeJokeBox(resource,) { // {"favoriteJokes": ["My toddler is refusing to nap. He’s guilty of resisting a rest.","Every time I take my dog to the park, the ducks try to bite him. That’s what I get for buying a pure bread dog."}
    class jokeToObjectClass {
        constructor(data, html) {
            this.favoriteBox = data.joke,
            
        }

    }

}


for(let joke of resource.favoriteJokes) {
    let jokeBox = new makeJokeBox(joke)
}