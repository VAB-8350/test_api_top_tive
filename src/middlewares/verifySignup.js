import  ROLES  from '../models/rol';


export const checkroles = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!(req.body.roles[i] in ROLES)) {
          return res.status(400).json({
            message: `Role ${req.body.roles[i]} does not exist`,
          });
        }
      }
    }
    next();
  };