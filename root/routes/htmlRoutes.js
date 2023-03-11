const path = require('path');
const router = require('express').Router();

router.get('/notes', (reg, res) => {
    res.sendFile(path.join(__dirname, '../root/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../root/index.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../root/index.html'));
});

module.exports = router;