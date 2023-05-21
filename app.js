const http = require('http');
var url = require("url");
var querystring = require('querystring')

const server = http.createServer((req, res) => {
  var page = url.parse(req.url).pathname;
// recuperer les parametres dans l'url 
// console.log(url.parse(req.url).query)
// requperer les parametres decoupee
  var params = querystring.parse(url.parse(req.url).query)
//console.log(params['id'])
  res.writeHead(200,{"content-Type" : "text/html"});
  if ( 'id' in params && 'login' in params)
  {
    res.write("votre id est" +params['id'] + "et votre login est " +params['login'])
  }
  else{
    res.write("Veuillez saisir votre id et login")
  }
  // if (page == '/') res.write("vous etes dans la page d acceuil")
  // else {
  //   res.writeHead(404,{"content-Type" : "text/html"});
  //   res.write("Erreur 404: Page non trouvée")
  // }
  res.end();
});

server.listen(8080)