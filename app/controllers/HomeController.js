class HomeController {
    //GET /home
    index(req, res) {
        // if (req.session.user) {
        res.render('home', { user: req.data});
        // } else {
        //     res.redirect('/');
        // }
    }
}

module.exports = new HomeController;