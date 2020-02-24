const noteData = require("../db/db")

module.exports =function(app){
  app.get("/api/notes", (req, res) => {
    res.json(noteData)
  });

  app.post("/api/notes", (req, res) => {
    const Note = req.body
    noteData.push(Note)
    res.json(noteData)
  })
}