const { readUser, createUser, updateUser, deleteUser } = require('../database/userQueries');
const users = [];
function readModel() {
    try{ 
        return new Promise(async (resolve, reject) => {
            await readUser(users);
            resolve(users)
        })
    } catch(error) {
        console.log(error)
    }
}
function readOneModel(id) {
    try {
        return new Promise(async (resolve, reject) => {
            await readUser(users);
            id--;
            resolve(users[id]);
        })
    } catch (err) {
        console.log(err)
        //server error
    }
}
function createOneModel(userData) {
    try {
        return new Promise(async (resolve, reject) => {
            const user = await createUser([userData])
            console.log(user)
            resolve(user) 
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
function updateOneModel(newData) {
    try {
        return new Promise((resolve, reject) => {
            const user = updateUser(newData)
            console.log(user)
            resolve(user)
        })
    } catch (err) {
        console.log(err)
    }
}
function deleteOneModel(id) {
    try {
        return new Promise((resolve, reject) => {
            const deletedUser = deleteUser(id);
            console.log(deletedUser)
            resolve(deletedUser)
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    readModel, 
    readOneModel,
    createOneModel,
    updateOneModel, 
    deleteOneModel
}