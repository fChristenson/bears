var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bearSchema = new schema({
    name: String
});

module.exports = mongoose.model('Bear', bearSchema);