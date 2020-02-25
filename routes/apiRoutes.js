const noteData = require("../db/db")

module.exports =function(app){
  //this sends the JSON in noteData to the ajax request
  app.get("/api/notes", (req, res) => {
    res.json(noteData)
  });

  //this takes the variable "newNote" in index.js which was put through an ajax call. In the ajax call it generates a number 1 to 1,000,000 and saves it as an id number to the variable
  //It also takes the body of newNote and pushes it into noteData array and returns the new array for rendering.
  app.post("/api/notes", (req, res) => {
    const note = req.body
    note.id = Math.floor(Math.random()*1000000)+1
    noteData.push(note)
    res.json(noteData)
  })


  //this takes the id associated with the list item and put it through this ajax call. This takes the incoming request and set it as a parameter of the variable note.
  //The for-loop loops through the noteData array and the if statement checks to see if the chosen id is equal to the object id. 
  //Once it finds a match it splices the position of where it matches in noteData and returns the new array for rendering.
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