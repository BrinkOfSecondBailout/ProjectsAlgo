const ItemController = require('../controllers/item.controller');

module.exports = function(app) {
    app.post('/api/items', ItemController.newItem);
    app.get('/api/items', ItemController.getAll);
    app.get('/api/items/:id', ItemController.getOne);
    app.get('/api/items/show/:userId', ItemController.getAllByUser);
    app.get('/api/items/shownot/:userId', ItemController.getAllNotByUser);
}