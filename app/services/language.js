var languageController = require('../controllers/languageController');

exports.getLanguageFeed = function(req,res){
    var langName = req.params.language;
    if(langName.length > 20){
        res.status(404).json({message:"Please enter valid Language Name"});
    }

    languageController.getFormattedData(langName).then(function(data){
        res.status(200).send(data);
    })
    .catch(function(err){
        res.status(500).json({message:"Sorry ! Your language not found"});
    });
};