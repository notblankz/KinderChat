import express from 'express';
import session from 'express-session';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(session({secret: 'secret', resave: false, saveUninitialized: false}));

router.get('/joinRoom', (req, res) => {
    res.render('joinRoom');
});

router.post('/joinRoom', (req, res) => {
    const roomNamePattern = /^[A-Za-z1-9]+$/;
    if (!roomNamePattern.test(req.body.room)) {
        return res.render('joinRoom', {error: 'Room name can only contain letters and numbers'});
    }
    const room = req.body.room;
    res.redirect(`/chat/${room}`); // /chat?room= ${room}  => /chat?room = test
});

export {router as joinRoomRouter};
