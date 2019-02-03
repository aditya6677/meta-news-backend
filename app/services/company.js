var companyController = require('../controllers/companyController');

exports.getCompanyFeed = function(req,res){
    res.status(200).send('Company Feed');
};