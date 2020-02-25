const noteData = require("../db/db")

module.exports =function(app){
  app.get("/api/notes", (req, res) => {
    res.json(noteData)
  });


  app.post("/api/notes", (req, res) => {
    const note = req.body
    note.id = Math.floor(Math.random()*1000000)
    noteData.push(note)
    res.json(noteData)
  })

  app.delete("/api/notes/:note", (req, res)=>{
    var chosen = req.params.note
    console.log("This is the chosen number " +chosen)
    console.table(noteData)
    for(let i=0; i < noteData.length; i++){
      console.log("This is noteData[" + i+ "] id's " + noteData[i].id)
      if(chosen == noteData[i].id){
        noteData.splice(i,1)
        res.json(noteData)
      }
    }
  })
}