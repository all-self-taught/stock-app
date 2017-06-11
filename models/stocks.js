var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockSchema = new Schema({
    symbol: { type: String, required: true }
});

module.exports = {
        Stock: mongoose.model('Stock', StockSchema)
    } 