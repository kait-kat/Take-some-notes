const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('../../api/notes.js');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../../assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../pages/index.html'));
});
app.use('/css', express.static(__dirname + '../css'));
app.use('/js', express.static(__dirname + '../js'));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../pages/notes.html'));
});

router.get('../../api/notes', (req, res) => {
  const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath));
  res.json(notes);
});

router.post('../../api/notes', (req, res) => {
  const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath));
  const newNote = req.body;
  newNote.id = notes.length.toString();
  notes.push(newNote);
  fs.writeFileSync(dbFilePath, JSON.stringify(notes));
  res.json(newNote);
});

router.delete('../../api/notes/:id', (req, res) => {
  const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');
  const notes = JSON.parse(fs.readFileSync(dbFilePath));
  const noteId = req.params.id;
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  fs.writeFileSync(dbFilePath, JSON.stringify(updatedNotes));
  res.json({ message: 'Note deleted' });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let noteTitle;
let noteText;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');

  saveNoteBtn.addEventListener('click', () => {
    console.log('Note saved!');
  });

  newNoteBtn.addEventListener('click', () => {
    console.log('New note!');
  });
}

let activeNote = {};

const getNotes = () =>
  fetch('../../api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  const deleteNote = (id) =>
  fetch(`../../api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleNoteSave = () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  
const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const renderNoteList = async(notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click');

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

const getAndRenderNotes = () => getNotes().then(renderNoteList);

getAndRenderNotes();
