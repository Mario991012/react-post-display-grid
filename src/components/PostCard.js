import React from 'react';

const PostCard = ({ title, userId, body }) => {
  return (
    <div className="card h-100 bg-dark text-light">
      <div className="card-body">
        <h5 className="card-title text-warning">{ title }</h5>
        <h6 className="card-subtitle mb-2 muted-text">ID Usuario: { userId }</h6>
        <p className="card-text">{ body }</p>
      </div>
    </div>
  );
};

export default PostCard;