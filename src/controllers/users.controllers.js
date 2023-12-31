const { Users } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        await Users.create({ username, email, password: hashed });
        res.status(201).end();
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });

        // if the user exists, it returns an object 
        // if it doesn't exist it returns null 
        // * truthy, a number, text, [], {}, true
        // ! falsy, "", 0, false, null, undefined 
        if (!user) {
            return next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "incorrect email / password",
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return next({
                status: 400,
                errorName: "Invalid Credentials",
                error: "incorrect email / password",
            });
        }

        // generate token
        const {
            id,
            username,
            firstname,
            lastname,
            profileImage,
            validEmail,
            createdAt,
            updatedAt,
          } = user;

        const token = jwt.sign(
            { id, username, email, firstname, lastname },
            process.env.JWT_SECRET,
            { algorithm: 'HS512', expiresIn: '10m'}
        );

        res.json({
            id,
            username,
            email,
            firstname,
            lastname,
            profileImage,
            validEmail,
            createdAt,
            updatedAt,
            token,
          });
    } catch (error) {
        next(error);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        // TODO search all users
        const allUsers = await Users.findAll({
            attributes: {
                exclude: ['password']
            },
        });

        // TODO respond to user
        res.json(allUsers);
    } catch {
        next(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
}