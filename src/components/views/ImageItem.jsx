import React from 'react';
import Image from 'next/image';

const ImageItem = ({ classes, url, name }) => {
  return (
    <div className={classes}>
      <button className='btn unestiled'>
        <Image
          src={url}
          alt={name}
          className='disable-image-drag unselectable grabbable'
          draggable={false}
          width={200}
          height={300}
        />
      </button>
    </div>
  );
};

export default ImageItem;
