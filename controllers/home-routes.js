const router = require('express').Router();

router.get('/', (req, res) => {

            res.render('home', {
                loggedIn: req.session.loggedIn
            });

});
router.get('/home', (req,res) => {
    res.redirect('/');
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');

        return;
    }

    res.render('signup');
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});
router.get('/dashboard/new', (req, res) => {
    res.render('new-post');
});
router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
    // res.redirect('/');
})

module.exports = router;