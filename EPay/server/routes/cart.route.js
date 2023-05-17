const CartController = require('../controllers/cart.controller');

module.exports = function(app) {
    app.post('/api/cart/add/:id', CartController.addToCart);
    app.get('/api/cart/show/:id', CartController.showMyCart);
}
