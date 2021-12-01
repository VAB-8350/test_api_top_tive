import user from '../models/user';
import jwt from 'jsonwebtoken';
import { SECRET } from "../keys";
import rol from '../models/rol';

export const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;

    const newUser = new user({
        username,
        email,
        password: await user.encryptPassword(password)
    });

    if (roles){
        const foundRoles = await rol.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id);
    } else{
        const role = await rol.findOne({name: 'user'});
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, String(SECRET), {
        expiresIn: 86400  //24HS
    });

    res.status(200).json({token});
}

export const signIn = async (req, res) => {
    const userFount = await user.findOne({email: req.body.email}).populate('roles');

    if (!userFount) return res.json({messaje: 'User not found'});


    const matchPassword = await user.comparePassword(req.body.password, userFount.password);

    if (!matchPassword) return res.status(401).json({token: null, message: 'invalid password'})

    const token = jwt.sign({id: userFount._id}, String(SECRET), {
        expiresIn: 86400  //24HS
    });

    res.status(200).json({token});
}