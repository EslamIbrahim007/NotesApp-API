import Note from '../models/note-mod.js';
import ApiError from '../util/ApiError.js';
import expressAsyncHandler from 'express-async-handler';

export const getAllNotes = expressAsyncHandler(async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err) {
        next(new ApiError(500, err.message));
    }
})

export const getNoteById =expressAsyncHandler(async (req, res, next)=> {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return next(new ApiError(404, 'Note not found'));
        }
        res.status(200).json(note);
    } catch (err) {
        next(new ApiError(500, err.message));
    }
})

export const getNotesByUser = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
        if (!user || !user._id) {
            return next(new ApiError(401, 'Authenticated user required'));
        }

        const notes = await Note.find({ user: user._id }).sort({ updatedAt: -1 });

        res.status(200).json({
            count: notes.length,
            data: notes
        });

    } catch (err) {
        next(new ApiError(500, 'Failed to retrieve notes: ' + err.message));
    }
});


export const createNote = expressAsyncHandler(async (req, res, next) =>{
    const {
        title,
        content
    } = req.body;

   
console.log(req.user._id);

    const note = new Note({
        title,
        content,
        user: req.user._id // Attach the authenticated user's ID
    });

    try {
        await note.save();
        res.status(201).send('Note created successfully');
    } catch (err) {
        next(new ApiError(500, err.message));
    }
})

export const updateNote = expressAsyncHandler(async (req, res, next) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

  
    try {
        const note = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });
        if (!note) {
            return next(new ApiError(404, 'Note not found'));
        };
        res.status(200).send('Note updated successfully');
    } catch (err) {
        next(new ApiError(500, err.message));
    }
})

export const deleteNote = expressAsyncHandler(async (req, res, next) => {
    const noteId = req.params.id;

    try {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return next(new ApiError(404, 'Note not found'));
        }
        res.status(200).send('Note deleted successfully');
    } catch (err) {
        next(new ApiError(500, err.message));
    }
})