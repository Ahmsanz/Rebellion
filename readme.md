This small application intends to serve as a microservice made using Node JS to make two different calls to a cloud repository hosted on Cloudinary.

With that purpose, a server is set up with NodeJS and Express in order to inject different ejs views to the selected port.

Some other dependencies are needed for it to work properly (as the code is right now), gettable using the npm functionalities:

  - cloudinary: integration for NodeJS to manage a cloud repository hosted on Cloudinary service.
  - config: used to hide some sensitive info.
  - ejs: allows to inject content using templates.
  - express: easy routing for NodeJS.


You can use "npm install" to begin with, and "nodemon main" to launch the app to the browser. 
