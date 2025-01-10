const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión MongoDB con mejor manejo de errores
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

// Esquema de Personaje
const characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  powerLevel: Number,
  image: String,
});

const Character = mongoose.model('Character', characterSchema);

// Rutas
app.get('/api/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/characters', async (req, res) => {
  try {
    const character = new Character(req.body);
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/characters/:name', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ message: 'Character not found' });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un personaje (PUT)
app.put('/api/characters/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Esto retorna el personaje actualizado
    );
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un personaje (DELETE)
app.delete('/api/characters/:id', async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json({ message: 'Character deleted successfully' }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});