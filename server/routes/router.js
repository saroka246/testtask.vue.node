const Router = require('express');
const router = new Router();

//controllers 
const notesController = require('../controllers/NotesController');

router.post('/notes', notesController.createNote);
router.get('/notes', notesController.getNotes);
router.get('/notes/all', notesController.getCountOfPosts);
router.get('/notes/:id', notesController.getOneNote);



module.exports = router;