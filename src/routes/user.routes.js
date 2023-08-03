const {Router} = require('express');
const {createUser, loginUser, getAllUsers} = require('../controllers/users.controllers');
const {loginUserValidator, registerUserValidator} = require('../validators/users.validators');
const authenticate = require("../middlewares/auth.middleware");


const router = Router();

router.post('/users', registerUserValidator, createUser);

router.post("/login", loginUserValidator, loginUser);

router.get('/users', getAllUsers);

router.get("/users", authenticate, (req, res) => {
     console.log(req);
     res.send("users");
   });

module.exports = router;