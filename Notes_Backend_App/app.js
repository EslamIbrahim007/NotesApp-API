import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

// Importing routers
import NotesRouter from './routers/note.routes.js';
import AuthRouter from './routers/auth.routes.js';  
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors())
// Security headers
app.use(helmet());
// Prevent NoSQL injection
app.use(mongoSanitize());
// Prevent XSS attacks
app.use(xss());
// Prevent HTTP Parameter Pollution
app.use(hpp());
// Body parsers
app.use(json());
app.use(urlencoded({ extended: false }));
// Routes
app.use("/notes", NotesRouter);
app.use("/auth", AuthRouter);

// Global Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
