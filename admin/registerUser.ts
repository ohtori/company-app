//Registration example
//1. Import: const registerUser = require('./admin/registerUser');
//2. Call: registerUser({ email: 'ohtori@mail.ru', password: '123456', isAdmin: true });
import { IUser } from '../interfaces/dbInterfaces';

const bcrypt = require('bcrypt');
const config = require('config');

const User = require('../models/User');

async function registerUser(user: IUser) {
  try {
      const candidate = await User.findOne({ email: user.email });
      if (candidate) {
        console.log(`User already exist: ${candidate.email}`);
        return;       
      };
      const hashPassword = await bcrypt.hash(user.password, config.get("bcrypt.salt"));
      const newUser = new User({ email: user.email, password: hashPassword, isAdmin: user.isAdmin });
      await newUser.save();
      console.log('User was created');
  } catch (e) {
    throw new Error(`Error when registration: , ${e.message}`);
  }
}
module.exports = registerUser;
export {}
