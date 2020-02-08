//declare and store express
const express = require ('express');

const app = express();

// set up server on port 3000

app.listen(3000, () => console.log('listening to port 3000'));

//set up template engine

app.set('view engine', 'ejs');

//serving static files

app.use(express.static(__dirname + '/public'));


// ROUTES

//route to home
app.get('/', function(req, res){
  res.render('home');
});


//cloudinary variable declared, importing it from the npm package "cloudinary"
const cloudinary = require('cloudinary').v2;

// account information
const keys = require('./config/keys.js');

//configuration of cloudinary using "config" method.
cloudinary.config({
  'cloud_name': keys.cloud_name,
  'api_key': keys.api_key,
  'api_secret': keys.api_secret
});



//getting resources from cloudinary repository
cloudinary.api.resources(
  (err, res) => {

//storing response in assets variable
    let assets = res.resources


//statistics object
  let stats = {
      totalImages: res.resources.length,
      formats: {
        jpg: countFormat(assets, 'jpg'),
        png: countFormat(assets, 'png'),
        svg: countFormat(assets, 'svg')
      },
      biggestPicture: biggest(assets),
      smallestPicture: smallest(assets),
      avgSize: avg(assets)
    }

//printing statistics object
     console.log(stats);

//route to statistics page
     app.get('/cloudinary/statistics', function(req, res){
         res.render('statistics', {stats: stats});
     });

    console.log(assets);

    //csv conversion

    let csv = csvConverter(assets);

    console.log(csv);

  //route to csv info page
  app.get('/cloudinary/csv', function (req, res) {

    res.render('csv', {csv: csv})
  });

  return stats;

});



//FUNCTIONS TO GET THE REQUESTED INFORMATION

//function to convert the repository information into .csv format

  function csvConverter(args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter;

//declare delimiters
  columnDelimiter = ',';
  lineDelimiter = '\n';

  keys = Object.keys(args[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  args.forEach(function(item) {
  ctr = 0;
  keys.forEach(function(key) {
  if (ctr > 0) result += columnDelimiter;

  result += item[key];
  ctr++;
  });
  result += lineDelimiter;
  });

  return result;
};

//functions to build the statistics object
  function countFormat(files, format) {
    return files.filter( file => file.format == format).length;

  };

  function smallest (files) {
    files.sort( (a,b) => a.bytes - b.bytes);
    return files[0].url;
  };

  function biggest (files){
    files.sort( (a,b) => a.bytes - b.bytes);
    return files[files.length - 1].url;
  };

  function avg(files) {
    let sizes = [];
    files.forEach( file => sizes.push(file.bytes))

    let avgSize = sizes.reduce((total,num) => total + num ) / sizes.length;

    return avgSize;
  };
