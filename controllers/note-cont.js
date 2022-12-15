const { json } = require("express/lib/response");
const generate = require("../util/generator") ; //for create Ids
const memory = require("../util/memorystorage");
const notemodel = require("../models/note-mod");


exports.getAllNotes = (req, res, next) => {
    // const ID = generate.generate();
    // memory.myStorage.setItem(ID,"1st key")
    // const ID2 = generate.generate();
    // memory.myStorage.setItem(ID2,"2nd key")

    // const keys=memory.getkeys(memory.myStorage);
    const values=memory.getvalues(memory.myStorage);
    console.log("values..."+JSON.stringify(values));
    
    // const Note = notemodel.Note;
    // const noteobj = new Note(ID,"jobs","its hard",new Date(),"Solos")
    res.status(200).send(JSON.stringify(values));
};

exports.saveNote = (req,res, next)=>{
    const ID = generate.generate();
    const title = req.body.title;
    const content = req.body.content;
    const createdAt = new Date();
    const createdBy = 'Admin';
    if (!title || !content){
        return res.status(500).send({err:'Title and Content should not be empty'});
    }
    const Note = notemodel.Note;
    const noteobj = new Note(ID,title,content,createdAt,createdBy);
    memory.myStorage.setItem(ID, noteobj);
    res.status(201).send('Note created successfully');
};

exports.updateNote= (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const createdAt = new Date();
    const createdBy = 'Admin';
    const id = req.params.id;
    if (!id) {
        return res.status(500).send({ err: 'ID is required.' });
    }
    if (!title || !content) {
        return res.status(500).send({ err: 'Title and Content should not be empty' });
    }
    const noteItem=memory.myStorage.getItem(id);
    if(!noteItem){
        return res.status(500).send({ err: 'ID not found' });
    }
    const Note = notemodel.Note;
    const noteobj = new Note(id, title, content, createdAt, createdBy);
    memory.myStorage.setItem(id, noteobj);
    res.status(200).send('Note updated successfully');
};

exports.deleteNote = (req, res, next) => {
    const id= req.params.id;
    if (!id) {
        return res.status(500).send({ err: 'ID is required.' });
    }
    const noteItem=memory.myStorage.getItem(id);
    if(!noteItem){
        return res.status(500).send({ err: 'ID not found' });
    }
    memory.myStorage.removeItem(id);
    res.status(200).send('Note deleted successfully');
};


module.exports;