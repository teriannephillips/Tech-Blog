const router = require('express').Router();
const {Post, User, Comment} = require(`../models`);
router.get('/', (req, res) => {

            res.render('home', {
                loggedIn: req.session.loggedIn
            });

});
router.get('/home', async (req,res) => {
    try {
        const postsData = await Post.findAll(
            {
                attributes: ["id", "post", "title", "created_at"],
                order: [
                    ["created_at", "DESC"]
                ],
                include: [{
                        model: User,
                        attributes: ["username"],
                    },
                    {
                        model: Comment,
                        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                        include: {
                            model: User,
                            attributes: ["username"],
                        },
                    },
                ],
            }
        );
        const posts= postsData.map((post) => post.get({ plain: true }));
        console.log(posts);
    res.render('home', {
    posts,
    });

}catch (err) {
      console.log(err);
      res.status(500).json(err);
}
});

// // GET all cars data and render the home page
// router.get('/home', async (req, res) => {
//     try {
//       const carsData = await Car.findAll();
//       const cars = carsData.map((car) => car.get({ plain: true }));
//       res.render('home', {
//         cars,
//         logged_in: req.session.logged_in,
//         customer_email: req.session.email
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

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