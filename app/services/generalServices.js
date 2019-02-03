var generalController = require('../controllers/generalController');
exports.getTrending = function(req,res){
    generalController.getTrending().then(function(data){
        res.status(200).send(data);
    })
    .catch(function(){
        res.status(404).json({message : 'Not Found', code : '404'});
    });
};

exports.getTopTech = function(req,res){
    generalController.getTopTech().then(function(data){
        res.status(200).send(data);
    })
    .catch(function(){
        res.status(404).json({message : 'Not Found', code : '404'});
    })
}