var Stock = require('../models/stocks').Stock;
var quotes = [];
  
module.exports = function(app){

	app.get('/', function(req, res){
    Stock.find({}, function(err, stocks){

      if (stocks.length > 0 ){
        require('../models/historical')(stocks, '01/01/2016', getToday(), function(quotes, symbols){
          res.render('index', { quotes: quotes, symbols: symbols });
        });
      } else {
        res.render('index', { quotes: {}, symbols: [] });
      };
    });
	});

  app.post('/', function(req, res){
    var stock = new Stock({symbol: req.body.stock})
    stock.save(function(err){
      if (err) console.log(err);
    });
    res.redirect('/');
  });

  app.delete('/:symbol', function(req, res){
    Stock.findById(req.params.symbol).remove().exec();  
  });
}

function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  today = mm+'/'+dd+'/'+yyyy;
  return today;
}