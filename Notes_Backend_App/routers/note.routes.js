import express from 'express';
import {
    getAllNotes,
    getNoteById,
    getNotesByUser,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/note.controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/Auth.middleware.js';
import { validateRequest } from '../middlewares/validate.js';

const router = express.Router();

router.use(isAuthenticated);
// Define routes for notes
router.get('/', isAdmin ,getAllNotes);
router.get('/user', getNotesByUser);
router.get('/:id', getNoteById);
router.post('/create', validateRequest ,createNote);
router.patch('/update/:id', validateRequest,updateNote);
router.delete('/delete/:id',deleteNote);

export default router;