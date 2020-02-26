var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");


var $titleSearchbtn = $(".title-btn")
var $textSearchbtn = $(".text-btn")
var $userTitle = $(".search-title")
var $userText = $(".search-text")
var $searchList = $(".search-container .list-group")
var $searchTitle = $(".search-title")
var $searchText = $(".search-text")


// activeNote is used to keep track of the note in the textarea
var activeNote = {};
var searchNote = {};
// A function for getting all notes from the db
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $saveNoteBtn.hide();
  if (activeNote.id >= 0) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();
  console.table(notes)
  var noteListItems = [];
  if (notes != 0){
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class='list-group-item'>").data(note);
    $li.attr("data-id", notes[i].id)
    var $span = $("<span>").text(note.title);
    var $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");

    $li.append($span, $delBtn);
    noteListItems.push($li);}
  // }
  }
  console.log("this is the final note: " +JSON.stringify(notes))

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();

//search bar functions and rendering
var renderResultList = function(notes) {
  $searchList.empty();
  console.table(notes)
  var searchListItems = [];
  console.log(notes)
  if (notes != 0){
    $searchList.text("No matches, please try again.")
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class='list-group-item'>").data(note);
    // $li.attr("data-id", notes[i].id)
    var $span = $("<span>").text(note.title);

    $li.append($span);
    searchListItems.push($li);}
  // }
  }
  console.log("this is the final note: " +JSON.stringify(notes))

  $searchList.append(searchListItems);
};


var filterTitle = (notes) =>{
  return new Promise(function(resolve, reject){
  let titleResult = []
  if (notes.length != 0){
    for(let i=0; i<notes.length; i++){
      var title = (notes[i].title).trim().toLowerCase()
      var userTitle = ($userTitle.val()).trim().toLowerCase()
      if(title.includes(userTitle)){
        titleResult.push(notes[i])
      }
    }
    console.table(titleResult)
    resolve(titleResult)
  }
  reject($searchList.text("Sorry no matches found"))
  })
}

var filterText = (notes) =>{
  return new Promise(function(resolve, reject){
    let textResult = []
    if (notes.length != 0){
      for(let i=0; i<notes.length; i++){
        var text = (notes[i].text).toLowerCase().split(" ")
        var userText = ($userText.val()).trim().toLowerCase()
        if(text.includes(userText)){
          textResult.push(notes[i])
        }
      }
    console.table(textResult)
    resolve(textResult)
  }
  reject($searchList.text("Sorry no matches found"))
  })
}


var searchForTitle = function(){
  getNotes()
    .then(data => filterTitle(data))
    .then(results => renderResultList(results))
}

var searchForText = function(){
  getNotes()
    .then(data => filterText(data))
    .then(results => renderResultList(results))
}

var handleSearchView = function() {
  searchNote = $(this).data();
  console.log(searchNote)
  $searchTitle.text(searchNote.title);
  $searchText.text(searchNote.text);
};

// var renderSearchNote = function() {
//   if (activeNote.id >= 0) {
//     $searchTitle.attr("readonly", true);
//     $searchText.attr("readonly", true);
//     ;
//   } 
// };

$titleSearchbtn.on("click", searchForTitle)
$textSearchbtn.on("click", searchForText)
$searchList.on("click", ".list-group-item", handleSearchView);