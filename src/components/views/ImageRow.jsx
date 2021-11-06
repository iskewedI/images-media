import React from 'react';
import ImageItem from './ImageItem';

const ImageRow = ({ images = [], isSliding }) => {
  return (
    <>
      {images.map(image => (
        <div key={image.id} className='row__image-container'>
          <ImageItem
            classes={`row__image ${!isSliding ? 'hoverable__image' : ''}`}
            name={image.name}
            url={image.url}
          />
        </div>
      ))}
    </>
  );
};

export default ImageRow;
