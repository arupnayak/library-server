var userController = function(User){

    var post = function(req, res){
        var user = new User(req.body);

        if(!req.body.email){
            res.status(400);
            res.send('Email is required');
        }
        else {
            User.find({email: req.body.email}, function(err,users){
                console.log(req.body.email);
                console.log(err);
                console.log(users);
                if(err){
                    res.status(504).send(err);
                }
                else if(users.length == 0){
                    user.save();
                    res.status(201);
                    res.send(user);
                }
                else if(users.length != 0 ){
                    res.status(500).send('Email already exists.');
                }
            });
        }
    }

    var get = function(req,res){
        console.log(req.query); 
        User.find(req.query, function(err,users){

            if(err)
                res.status(500).send(err);
            else {
                var returnUsers = [];
                res.json(users);
            }
        });
    }

    var getUserById = function (req, res) {
        res.json(req.user);

    }

    var putPatchUserById = function (req, res) {
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body) {
            req.user[p] = req.body[p];
        }
        
        req.user.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.user);
            }
        });
    }

    var deleteUserById = function (req, res) {
        req.user.remove(function (err) {
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
        getUserById: getUserById,
        putPatchUserById: putPatchUserById,
        deleteUserById: deleteUserById
    }
}

module.exports = userController;