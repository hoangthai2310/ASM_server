const homeRouter = require('./home');
const loginRouter = require('./login');
const products = require('./products');
const qlsp = require('./qlsp');
const qluser = require('./qluser');
const info = require('./info');
const client = require('./client');

function route(app) {

    
    app.use('/home', homeRouter);
    
    app.use('/products', products);
    
    app.use("/info", info);
    
    app.use("/qlsp", qlsp);
    
    app.use("/qluser", qluser);

    app.use("/api", client);
    
    app.use('/', loginRouter);
}

module.exports = route;