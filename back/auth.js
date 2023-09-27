const { getOneUser, createOneUser } = require('./Controller/userController')
const { hash, compare } = require('bcrypt');

class User {
    constructor(name, surname, email, password, is_admin){ 
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password,
        this.is_admin = is_admin
    }
} 


function register() {
    
    const userInit = new User('thing', 'thing2', 'email@email.com', 'pass', true);
    
}

register()