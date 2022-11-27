const User = require("../models/User.model");
const Role = require("../models/Role.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const {secret} = require('./config')
const jwt = require('jsonwebtoken');

const generateAccesToken = (id,roles)=>{
    const payload ={id,roles}

    return jwt.sign(payload,secret,{expiresIn:'24h'})
}

module.exports.UserController = {
  signUp: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "registration error 400", errors });
      }
      const { login, password } = req.body;
      const candidate = await User.findOne({ login });
      if (candidate) {
        return res.status(400).json({ message: "login already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 6);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        login,
        password: hashPassword,
        roles: [userRole.value],
      });
      console.log(userRole)
      await user.save();
      return res.json({ message: "success registration" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "registration error" });
    }
  },
  signIn: async (req,res)=>{
try {
    const {login,password} = req.body
    const user = await User.findOne({login})
    if(!user){
        return res.status(400).json({message:'user not found'})   
    }
    
    const validatedPassword = bcrypt.compareSync(password,user.password)
    if(!validatedPassword){
        return res.status(400).json({message:'wrong password'})   
    }
const token = generateAccesToken(user._id, user.roles)

return res.json(token)
} catch (error) {
    res.json(message.error);
}

  },
  getUsers: async (req, res) => {
    try {
        const users = await User.find()
       return res.json(users);
    } catch (error) {
      console.log(error.message);
    }
  },
};
