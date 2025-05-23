export function classForJokes(resource) {
    console.log(resource);
    
    class Joke {
        constructor(data) {
            this.status = data.status;
        }

        get status() {
            return this._status
        }

        set status(value) {
            this._status = "current";
        }
    }
}