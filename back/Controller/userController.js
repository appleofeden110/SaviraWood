const { readModel, readOneModel, createOneModel, updateOneModel, deleteOneModel } = require('../Model/userModel');
const { hash, compare } = require('bcrypt')

async function getAllUsers(req, res) {
    try {
        const users = await readModel();
        if (res.status(200)) {
        res
            .status(200)
            .json(users)
        } 
    } catch (err) {
        console.log(err)
    }
}

async function getOneUser(req, res, id) {
    try {
        const user = await readOneModel(id)
        if (user) {
            res
                .status(200)
                .json(user)
        } else {
            console.error('User not found')
            res
                .status(404)
                .json({error: 'User not found'})
        }
    } catch (err) {
        console.log(err)
        //server error
        res
            .status(500)
            .json(err)
    }
}

async function createOneUser(req, res) {
    try {
        const { name, surname, email, password, is_admin, session_id } = req.body;
        const passwordHash = await hash(password, 12);
        const newUser = {
            name,
            surname,
            email,
            passwordHash,
            is_admin,
            session_id
        };
        const createdUser = await createOneModel(Object.values(newUser));
        res.status(201).json(createdUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function updateOneUser(req, res, id) {
    try {
        const user = await readOneModel(id)
        if (!user) {
            res.status(409).json({errMessage: 'User does not exist, want to create one?'})
        } else {
            const { name, surname, email, password, is_admin } = req.body;
            const passwordHash = await hash(password, 12);
            const updatedUser = {
                name: name || user.name, 
                surname: surname || user.surname,
                email: email || user.email, 
                password: passwordHash || user.password, 
                is_admin: is_admin || user.is_admin, 
                id 
            }
            res.status(201).json(await updateOneModel(Object.values(updatedUser)))    
        }
    } catch (err) {
        console.log(err)
        res
            .status(500)
            .json(err)
    }
}

async function deleteOneUser(req, res, id) {
    try {
        const user = await readOneModel(id);
        if(!user) {
            throw new Error('FUCK OFF')
        } else {
            await deleteOneModel(id);           
        }
    } catch (err) {
        console.log(err)
        req
            .status(500)
            .json(err)
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createOneUser,
    updateOneUser, 
    deleteOneUser
}