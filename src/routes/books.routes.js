const { Router } = require('express');
const router = Router();
import * as bookCtrl from '../controllers/boock.controller'
import { authjwt } from "../middlewares";


router.get('/', bookCtrl.getBooks);

router.get('/:id', bookCtrl.getBookId);

router.post('/', [authjwt.verifyToken, authjwt.isAdmin], bookCtrl.addBook);

router.delete('/:id', [authjwt.verifyToken, authjwt.isModerator], bookCtrl.deleteBook);

router.put('/:id', [authjwt.verifyToken, authjwt.isModerator], bookCtrl.updateBook);

module.exports = router;