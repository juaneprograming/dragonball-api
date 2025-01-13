const Character = require('../models/Characters');

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCharacter = async (req, res) => {
  try {
    const character = new Character(req.body);
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchCharacter = async (req, res) => {
  try {
    const { name } = req.query;
    const character = await Character.findOne({ name: new RegExp(name, 'i') }); // Búsqueda insensible a mayúsculas
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { getCharacters, createCharacter, updateCharacter, deleteCharacter, searchCharacter };
