var yahoo_finance = require('yahoo-finance');

module.exports = function(stocks, start_date, end_date, callback){
        
        var symbols = [];
        var symbolObject = [];

        stocks.forEach(function(stock){
            symbols.push(stock.symbol);
            symbolObject.push({symbol: stock.symbol, id: stock._id})
        })


        yahoo_finance.historical({
        	symbols: symbols,
        	from: start_date,
        	to: end_date
    	}, function(err, result){
    	    var quotes = {};	
    		for (var key in result){
    			quotes[key] = [];
    			result[key].forEach(function(close){
    				quotes[key].push({date: close.date, close: close.close});
    			});
    		}
    		callback(quotes, symbolObject);
        });

    } 