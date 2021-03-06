var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIS
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', {
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error '));
// --->>> SET UP SESSION <<<----
app.use(session({
  secret: 'mySecretString',
  saveUninitialized : false,
  resave: false,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60})
})
)
// SAVE TO SESSION
app.post('/cart', function(req, res){
  var cart= req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  } )
})

// GET SESSION CART API
app.get('/cart', (req, res) =>{
  if(typeof req.session.cart != 'undefined'){
    res.json(req.session.cart);
  }
});
//----->>> END SESSION <<<----

var Books = require('./models/books.js');

//---->> POST BOOKS <<----
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books)
  })
});

//---->> GET BOOKS <<----
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books)
  })
})

//---->> DELETE BOOKS <<----
app.delete('/books/:_id', function(req, res){
  var query = {_id:req.params._id};

  Books.remove(query, function(err, books){
    if(err){
      throw err;
    }
    res.json(books)
  })
})

//---->> UPDATE BOOKS <<----
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;

  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  //When true returns the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  });

})


// ---> GET BOOKS IMAGES API <<<---
app.get('/images', (req ,res) =>{
  const imgFolder = __dirname + '/public/images/';
  //REQUIRE FILE SYSTEMS
  const fs = require('fs');
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, (err, files) =>{
    if(err){
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    var i = 1;
    //INTERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach((file)=>{
      filesArr.push({name: file});
      i++;
    })

    //SEND THE JSON RESPONSE WITH ARRAY
    res.json(filesArr);

  })
})

//END APIS

app.listen(3001, (err) => {
  if(err){
    return console.log(err);
  }
  console.log("API SERVER is listening on http://localhost:3001")
})