var bookController = function(Book){
    var mongoose = require('mongoose');
    var post = function(req, res){
        var book = new Book(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }

    var get = function(req,res){

        /* var query = {};

        if(req.query.title)
        {
            query.title = req.query.title;
        } */
        
        console.log(req.query); 
        Book.find(req.query, function(err,books){

            if(err)
                res.status(500).send(err);
            else {

                var returnBooks = [];
                /* books.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links= {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id
                    returnBooks.push(newBook);
                }); */
                res.json(books);
            }
        });
    }

    var getBookById = function (req, res) {
        res.json(req.book);

    }

    var putPatchBookById = function (req, res) {
        console.log(req.body);
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body) {
            req.book[p] = req.body[p];
        }
 
        console.log(req.book);
        
        req.book.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.book);
            }
        });
    }

    var deleteBookById = function (req, res) {
        req.book.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    }

    return {
        post: post,
        get:get,
        getBookById: getBookById,
        putPatchBookById: putPatchBookById,
        deleteBookById: deleteBookById
    }
}

module.exports = bookController;