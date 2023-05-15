import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

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

  useEffect(() => {
    const filtered = posts
      .filter((post) => {
        return (
          post.userId.toString().includes(filter) ||
          post.title.toLowerCase().includes(filter.toLowerCase()) ||
          post.body.toLowerCase().includes(filter.toLowerCase())
        );
      })
      .sort((t1, t2) => {
        const title1 = t1.title.toLowerCase();
        const title2 = t2.title.toLowerCase();
        return sortOrder === 'asc' ? title1.localeCompare( title2 ) : title2.localeCompare( title1 );
      });

    setFilteredPosts(filtered);
  }, [posts, filter, sortOrder]);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container-fluid bg-dark text-light py-5">
      <a href="https://mario-velasquez.web.app/" target={'_blank'}>
        <img src="favicon.png" alt="mv" className="centered-img" width={ 100 } height={ 100 }></img>
      </a>
      <h1 className="text-center mb-4">Publicaciones</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Filtrar por ID usuario, título o texto"
        value={ filter }
        onChange={ onFilterChange }
      />
      <select
        className="form-select mb-4"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ordenar por título ascendente</option>
        <option value="desc">Ordenar por título descendente</option>
      </select>
      <div className="row">
        { filteredPosts.map((post) => (
          <div className="col-md-4 col-lg-4 col-sm-12 mb-4" key={ post.id }>
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