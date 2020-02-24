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

  app.delete("/api/notes/:note", (req, res)=>{
    var chosen = req.params.note
    console.log(chosen)
    console.log(noteData)
    for(let i=0; i < noteData.length; i++){
    //   console.log(noteData[i].id)
      if(noteData[i].id === chosen){
        noteData[i] = {}
        res.json(notes)
      }
    }
  })
}