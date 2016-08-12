var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var mysql       = require('mysql');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// MYSQL CONNECTION
// ========================================
var connection = mysql.createConnection({
  host     : '192.168.10.10',
  user     : 'homestead',
  password : 'secret',
  database : 'newnguyenha'
});
connection.connect();

// MONGO CONNECTION
// ========================================
var db = mongoose.connect('mongodb://localhost/vpage');

// MODEL DEFINITIONS
// ========================================
var Post = require('./app/models/post');
var User = require('./app/models/user');

// ROUTES
// ========================================
var router = express.Router();

router.route('/posts')
  .post(function(req, res) {
    var _post = new Post();
    _post.title = 'Phần mềm quản lý Fanpage Facebook bán hàng cực hiệu quả!';
    _post.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Post created!'});
    })
  })
  .get(function(req, res) {
    Post.find(function(err, posts) {
      if (err) {
        res.send(err);
      }
      res.json(posts);
    });
  });

router.get('/nguyenha', function(req, res) {
  connection.query('SELECT * FROM users', function(err, users, fields) {
    if (err) throw err;
    users.forEach(function(user) {
      var mguser = new User();
      mguser.email = user.email;
      mguser.name = user.name;
      mguser.nickname = user.nickname;
      mguser.avatar = user.avatar;
      mguser.phone = user.phone;
      mguser.address = user.address;
      mguser.save(function(err) {
        if (err) res.send(err);
        // res.json(mguser);
       });
    }, this);
    // res.json(users);
  });

  connection.end();
});

app.use('/', router);
app.listen(port, function() {
  console.log('Listening on port ' + port);
});