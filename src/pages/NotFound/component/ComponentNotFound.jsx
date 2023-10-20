import React from 'react';
import image from '../../../assets/images/notfound.png';

function NotFound() {
  return (
    <div className='not-found'>
      <div className='img-notfound'>
        <img src={image} />
      </div>
      <h1>404</h1>
      <h3>Oops! Page Not Found </h3>
    </div>
  );
}

export default NotFound;
