var path = require("path")

module.exports = function(app){
  //html routing
  app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname,"../public/notes.html"))
  );

  app.get("/search",(req,res)=>
    res.sendFile(path.join(__dirname,"../public/search.html"))
  );
  
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname,"../public/index.html"))
  )
}