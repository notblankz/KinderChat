import express from 'express';
// import { dbConnect } from './models/user.js';
import { loginRouter } from './routes/login.js';
import { registerRouter } from './routes/register.js';
import { landingRouter } from './routes/landing.js';
import { joinRoomRouter } from './routes/joinRoom.js';
import { chatRouter } from './routes/chat.js';
import { aboutRouter } from './routes/about.js';
import cors from 'cors';

const app = express();

// Database connection
// dbConnect();

// Middleware and routes
app.set('view engine', 'ejs');
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.static('public'));
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', landingRouter);
app.use('/', joinRoomRouter);
app.use('/', chatRouter);
app.use('/', aboutRouter);

export default app;
