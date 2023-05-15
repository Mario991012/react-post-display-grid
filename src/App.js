import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  }, []);

  const onFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    const filtered = posts.filter((post) => {
      return (
        post.userId.toString().includes(value) || post.title.toLowerCase().includes(value.toLowerCase()) || post.body.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredPosts(filtered);
  };

  return (
    <div className="container-fluid bg-dark text-light py-5">
      <h1 className="text-center mb-4">Publicaciones</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Filtrar por ID usuario, título o texto"
        value={ filter }
        onChange={ onFilterChange }
      />
      <div className="row">
        { filteredPosts.map((post) => (
          <div className="col-md-4 col-lg-4 col-sm-12 mb-4">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title text-warning">{ post.title }</h5>
                <h6 className="card-subtitle mb-2 muted-text">ID Usuario: { post.userId }</h6>
                <p className="card-text">{ post.body }</p>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default App;