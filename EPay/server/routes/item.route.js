const ItemController = require('../controllers/item.controller');

module.exports = function(app) {
    app.post('/api/items', ItemController.newItem);
    app.get('/api/items', ItemController.getAll);
}