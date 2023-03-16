const router = require('express').Router();
const noteRoutes = require('./notesRoute.js');
router.use(noteRoutes);
module.exports = router;