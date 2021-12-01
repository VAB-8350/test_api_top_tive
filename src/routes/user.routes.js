const { Router } = require('express');
const router = Router();
import * as userCtrl from '../controllers/user.controller'
import { authjwt , verifySignup } from "../middlewares";


router.post('/', [authjwt.verifyToken, authjwt.isAdmin, verifySignup.checkroles], userCtrl.createUser);


module.exports = router;