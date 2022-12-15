//setup server 
const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');


app.use(cors()); 
//parse application/json
app.use(express.json());
// parse application/x-www-urlencoded
app.use(express.urlencoded({ extended:false}));

//Routes
const NotesRouter = require('./routers/note-route');
app.use("/",NotesRouter);

app.get('/',(req,res,next) => {
    res.send('main page for Notes App');
});



app.listen(3333,()=>{
    console.log('listening on port 3333......');
});
