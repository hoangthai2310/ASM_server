const express = require("express");
const session = require('express-session');
const Handlebars = require('handlebars');
const app = express();
const port = 8000;
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); // import thư viện
var cookieParser = require('cookie-parser')


const route = require('./routes/app');
// app.use(express.static(__dirname));
app.use(cookieParser())
app.use(express.static(__dirname, { type: 'text/javascript' }, { type: 'text/css' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}));


app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    }
}));

app.set('view engine', '.hbs');

// routes
route(app);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});