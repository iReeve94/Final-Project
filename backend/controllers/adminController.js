/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Admin } = require('../models/userModel');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch admin from the database
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ msg: 'Invalid admin credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Invalid admin credentials' });
        }

        // If the credentials match, create a JWT token for the admin
        const token = jwt.sign({ email: admin.email }, process.env.PRIVATE_KEY, { expiresIn: '1h' });

        res.status(200).json({ msg: 'Admin login successful', token });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    loginAdmin
}; */
