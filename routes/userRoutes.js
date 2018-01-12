var express = require('express');


var userRoutes = function (User) {
    var router = express.Router();

    var controller = require('../controllers/userController')(User)
    
    router.route('/')
        .post(controller.post)
        .get(controller.get);

    router.use('/:userId', function (req, res, next) {
        User.findById(req.params.userId, function (err, user) {
            if (err)
                res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(404).send('no user found');
            }
        });
    });
    router.route('/:userId')
        .get(controller.getUserById)
        .put(controller.putPatchUserById)
        .patch(controller.putPatchUserById)
        .delete(controller.deleteUserById);
    return router;
};

module.exports = userRoutes;