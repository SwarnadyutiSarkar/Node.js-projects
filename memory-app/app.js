import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/memories')
      .then(res => setMemories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/memories', { title, description });
      setMemories([...memories, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Memory Sharing App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Memory</button>
      </form>
      <div>
        {memories.map(memory => (
          <div key={memory._id}>
            <h3>{memory.title}</h3>
            <p>{memory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
