const { Router } = require('express');
const router = Router();
import * as bookCtrl from '../controllers/boock.controller'
import { authjwt } from "../middlewares";


router.get('/', bookCtrl.getBooks);

router.get('/:id', bookCtrl.getBookId);

router.post('/', bookCtrl.addBook);

router.delete('/:id', bookCtrl.deleteBook);

router.put('/:id', bookCtrl.updateBook);

module.exports = router;

// restricciones para usuarios (funcionan, pero las retire por test de front)
// [authjwt.verifyToken, authjwt.isModerator], es del delete
// [authjwt.verifyToken, authjwt.isAdmin], es de post
// [authjwt.verifyToken, authjwt.isModerator], es de put