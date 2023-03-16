
const router = require('express').Router();
const { notes } = require('../db/db.json');
const { createNote, deleteNote, readNote } = require('../db/notes.js');
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {

    const newNotes = readNote();
    if (newNotes) {
    const newNotesObj = JSON.parse(newNotes);
    res.json(newNotesObj.notes);
    }
    else {
        res.status(400).send('INVALID NOTE');
    }
});

router.post('/notes', (req, res) => {
    const newNotes = readNote();
    const newNotesObj = JSON.parse(newNotes);
    if (req.body.title && req.body.text) {
        const results = createNote(req.body, newNotesObj.notes);
        res.json(results);
    } else {
        res.status(400).send('INVALID NOTE');
    }
});


router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const newNotes = readNote();
    const newNotesObj = JSON.parse(newNotes);
    const results = deleteNote(id, newNotesObj.notes);
    res.json(results);
});

module.exports = router;