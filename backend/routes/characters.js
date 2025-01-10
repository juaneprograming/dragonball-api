const express = require('express');
const { getCharacters, createCharacter, updateCharacter, deleteCharacter, searchCharacter } = require('../controllers/characterController');

const router = express.Router();

router.get('/', getCharacters);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

// Nueva ruta para buscar personajes por nombre
router.get('/search', searchCharacter);

module.exports = router;
