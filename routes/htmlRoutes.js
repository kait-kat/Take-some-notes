const path = require('path');
const router = require('express').Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
  });


router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/notes.html'));
  });

module.exports = router;