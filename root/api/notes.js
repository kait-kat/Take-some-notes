import { getNotes, createNote, updateNote, deleteNote } from './assets/js/notefunctions.js';
const notes = [];

function getNotes() {
  return notes;
}

function createNote(note) {
  notes.push(note);
}

function updateNote(id, updatedNote) {
  const noteIndex = notes.findIndex(note => note.id === id);
  notes[noteIndex] = { ...notes[noteIndex], ...updatedNote };
}

function deleteNote(id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  notes.splice(noteIndex, 1);
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};