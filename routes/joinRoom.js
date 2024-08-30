import express from 'express';
import session from 'express-session';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(session({secret: 'secret', resave: false, saveUninitialized: false}));

router.get('/joinRoom', (req, res) => {
    res.render('joinRoom');
});

router.post('/joinRoom', (req, res) => {
    const room = req.body.room;
    res.redirect(`/chat/${room}`);
});

export {router as joinRoomRouter};
