var express = require('express');


var bookRoutes = function (Book) {
    var router = express.Router();

    var controller = require('../controllers/bookController')(Book)
    router.route('/')
        .post(controller.post)
        .get(controller.get);

    router.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no book found');
            }
        });
    });
    router.route('/:bookId')
        .get(controller.getBookById)
        .put(controller.putPatchBookById)
        .patch(controller.putPatchBookById)
        .delete(controller.deleteBookById);
    return router;
};

module.exports = bookRoutes;