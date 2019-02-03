const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const cors = require('cors');
const configs = require('./app/models/scrapModel');
const port = 7676;

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use(function(req,res,next){
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    if(req.headers.authorization === configs.AUTH){
        next();
    }
    else{
        return res.status(403).json({ message: 'Invalid Authorization Header',"status": 403,"detail": "Forbidden" });
    }
});

app.get('/',function(req,res){
    res.status(200).send('Welcome to Feed-Reader API Services');
});

require('./app/routes')(app);
module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}`));