import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]); // Definir characters en el estado

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get('http://localhost:3001/api/characters')
      .then(response => {
        setCharacters(response.data); // Actualizar el estado con los datos recibidos
      })
      .catch(error => console.error('Error fetching data: ', error));
  }

  return (
    <>
      <div>
        <h1>Characters</h1>
        <ul>
          {characters.map(character => (
            <li key={character._id}>{character.name}</li> // Mostrar el nombre de cada personaje
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
