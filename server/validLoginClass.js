
export function validLogin(resource) {

    class UserPassword {
        constructor(data) {
            this.password = data.password;
            this.name = data.name
        }
        get password() {
            return this._password;
        }
        set password(value) {
            // Kollar så att lösenordet har minst 4 tecken samt om den innehåller minst ett nummer och stor bokstav 
            
            let arrayOfletter = value.split("");
            let checkIfItContainsOneNumber = false;
            let checkIfItContainsOneUpperCase = false;
            for(let letter of arrayOfletter) {
                if(!isNaN(letter)) {
                    checkIfItContainsOneNumber = true;
                }
            }
            for(let letter of arrayOfletter) {
                if(letter.toUpperCase() === letter && letter.toLowerCase() !== letter) {
                    checkIfItContainsOneUpperCase = true;
                } 
            }
            if(arrayOfletter.length > 4 && checkIfItContainsOneNumber && checkIfItContainsOneUpperCase) {
                this._password = value
            } else {
                this._password = null
            }
        }
        get name() {
            return this._name;
        }
        set name(value) {
            // Kollar om namnet är minst 3 tecken
            let arrayOfletter = value.split("");
            if(arrayOfletter.length > 3) {
                this._name = value;
            } else {
                this._name = null;
            }
            
        }
        isValid() {
            if(this._name === null || this._password === null) {
                return false;
            } else {
                return true;
            }
            
        }
    }

    let user = new UserPassword(resource)
    return user.isValid()

}


