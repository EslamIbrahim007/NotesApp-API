const express = require('express');
const router = express.Router();
const noteCont = require('../controllers/note-cont');


router.get('/notes', noteCont.getAllNotes);
router.post('/create', noteCont.saveNote);
router.put('/update/:id', noteCont.updateNote);
router.delete('/delete/:id', noteCont.deleteNote);




module.exports =router;