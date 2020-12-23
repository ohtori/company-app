"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');
async function registerUser(user) {
    try {
        const candidate = await User.findOne({ email: user.email });
        if (candidate) {
            console.log(`User already exist: ${candidate.email}`);
            return;
        }
        ;
        const hashPassword = await bcrypt.hash(user.password, config.get("bcrypt.salt"));
        const newUser = new User({ email: user.email, password: hashPassword, role: user.role });
        await newUser.save();
        console.log('User was created');
    }
    catch (e) {
        throw new Error(`Error when registration: , ${e.message}`);
    }
}
module.exports = registerUser;
