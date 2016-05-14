const Port = 5050;
var	express = require('express'),
	app = express();
     
module.exports = (()=>{
   function inner(){
      this.start = whatToDo=>{
	app.use(express.static(__dirname + '/public'));
	app.get('/', (req, res) => {
		res.send('<h1>Welcome to Express!</h1>');
		res.redirect('/index.html');
	});		  
	app.listen(process.env.port||Port,()=>console.log('--> Port %d listening!',Port));
      };   
    }
  return new inner;
})();


