
export function classForCheckPassword(resource) {
    console.log(resource)

    class UserPassword {
        constructor(password) {
            this.password = password;
        }
        get password() {
            return this._password;
        }
        set password(value) {
            console.log(value.split("").length)
            if(value.split("").length > 3) {
                this._password = value
            } else {
                this._password = null; 
            }
        }
        isValid() {
            return this._password !== null; 
        }
    }

    let user = new UserPassword(resource.password)
    console.log(user.isValid())
    return user.isValid()

}


