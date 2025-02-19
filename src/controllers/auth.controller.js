import Admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newAdmin = new Admin({
            username,
            email,
            password: passwordHash
        })
        const newAdminSaved = await newAdmin.save();
        const token = await createToken({ id: newAdminSaved._id })
        res.cookie('token', token);
        res.json({
            id: newAdminSaved._id,
            username: newAdminSaved.username,
            email: newAdminSaved.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password } = req.body;

    try {
       const adminFound =  await Admin.findOne({email})

       if(!adminFound) return res.status(400).json({message: 'Admin not found'});

        const isMatch = await bcrypt.compare(password, adminFound.password)

        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = await createToken({ id: adminFound._id })
        res.cookie('token', token);
        res.json({
            id: adminFound._id,
            username: adminFound.username,
            email: adminFound.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}