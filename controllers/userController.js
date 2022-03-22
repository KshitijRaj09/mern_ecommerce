const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const {
  registration_success,
  login_Success,
  login_fail,
  registration_fail,
  fill_All_Fields,
  user_doesnot_exist,
} = require('../constants/constantMsg');

const createUser = async (name, password, emailID, req, res) => {
  const user = await User.find({ emailID });
  //Check if User exists in Database
  if (user.length >= 1) {
    return res.status(400).json({
      success: false,
      error: true,
      message: registration_fail,
    });
  }

  //OtherWise create new user in Database
  const newUser = new User({ name, password, emailID });

  //create salt and hash to store encrypted password
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // Store hash in database here
      if (error) throw error;
      newUser.password = hash;
      const userSaved = await newUser.save();
      jwt.sign(
        { id: user._id },
        process.env.jwtSecretCode,
        { expiresIn: 3600 },
        //Generates jwt token
        (error, token) => {
          if (error) throw error;
          //Return user details with token
          return res.json({
            token,
            user: {
              id: newUser._id,
              name: newUser.name,
              emailID: newUser.emailID,
            },
            success: true,
            error: false,
            message: registration_success,
          });
        }
      );
    });
  });
};

//Controller fo User Signup
const signUp = (req, res) => {
  const { name, password, emailID } = req.body;

  //Check for all fields should be filled
  if (!name || !password || !emailID) {
    return res.status(400).json({
      success: false,
      error: true,
      message: fill_All_Fields,
    });
  }

  createUser(name, password, emailID, req, res);
};

//Controller for User Login
const login = async (req, res) => {
  const { emailID, password } = req.body;
  if (!emailID || !password) {
    return res.status(400).json({
      success: false,
      error: true,
      message: fill_All_Fields,
    });
  }

  const user = await User.findOne({ emailID });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: true,
      message: user_doesnot_exist,
    });
  }

  //validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: true,
      message: login_fail,
    });
  }
  jwt.sign(
    { id: user._id },
    process.env.jwtSecretCode,
    { expiresIn: 3600 },
    (error, token) => {
      if (error) throw error;

      //send user details with token
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          emailID: user.emailID,
        },
        success: true,
        error: false,
        message: login_Success,
      });
    }
  );
};

//Controller to get the user details except password
const authUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  return res.json(user);
};

module.exports = {
  authUser,
  login,
  signUp,
};
