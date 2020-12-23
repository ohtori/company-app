"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
function authRoute(req, res) {
    req.on('data', async (chunk) => {
        let { email, password } = JSON.parse(`${chunk}`);
        const errMessage = { message: 'Неверный логин или пароль, попробуйте снова', isError: true };
        if (email.length > 120
            || password.length < 6
            || password.length > 30
            || !email.match(/[^<>/]+@[^<>/]+\.[^<>/]+/)) {
            return res.status(400).json(errMessage);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(errMessage);
        }
        password = await bcrypt.compare(password, user.password);
        if (!password) {
            return res.status(400).json(errMessage);
        }
        const token = jwt.sign({ user }, require('config').get('serverConfig.jwtSecret'), { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    });
}
module.exports = authRoute;
