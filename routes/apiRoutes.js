const noteData = require("../db/db.json")

module.exports =function(app){
  app.get("/api/notes", function(){
    return res.json(noteData)
  });

  app.post("/api/notes", function(req, res){
    const Note = req.body
    noteData.push(Note)
  })
}