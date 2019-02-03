var langService = require('./services/language');
var companyServices = require('./services/company');
var generalServices = require('./services/generalServices')
module.exports = function (app) {
    app.get('/lang/:language', langService.getLanguageFeed);
    app.get('/company/:company', companyServices.getCompanyFeed);
    app.get('/getTrending', generalServices.getTrending);
    app.get('/tech',generalServices.getTopTech);
};