const UserController = require('../controllers/user.controller');

module.exports = function(app) {
    app.post('/api/login', UserController.login);
    app.post('/api/register', UserController.register);
    app.get('/api/users/:id', UserController.getOneUser);
    app.patch('/api/users/profile/:id', UserController.updatePicture);
}