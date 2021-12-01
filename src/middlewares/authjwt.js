import jwt from 'jsonwebtoken';
import { SECRET } from "../keys";
import user from '../models/user';
import rol from '../models/rol';

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers["x-access-token"];

        console.log(token);

        if (!token) return res.status(404).json({message: 'No token provided'})

        const decoded = jwt.verify(token, String(SECRET));
        req.userId = decoded.id;

        const foundUser = await user.findById(req.userId);
        if (!foundUser) return res.status(404).json({message: 'user not found'})

        next();
    }catch (error){
        return res.status(401).json({message: 'Unauthorized'});
    }
    
}

export const isModerator = async (req, res, next) => {

    const foundUser = await user.findById(req.userId);
    const roles = await rol.find({_id: {$in: foundUser.roles}})

    for (let i = 0; i < roles.length; i++){
        if (roles[i].name === 'moderator'){
            next()
            return;
        }
    }
    return res.status(403).json({menssage: 'requer moderator role'})
}

export const isAdmin = async (req, res, next) => {
    const foundUser = await user.findById(req.userId);
    const roles = await rol.find({_id: {$in: foundUser.roles}})

    for (let i = 0; i < roles.length; i++){
        if (roles[i].name === 'admin'){
            next()
            return;
        }
    }
    return res.status(403).json({menssage: 'requer admin role'})
}