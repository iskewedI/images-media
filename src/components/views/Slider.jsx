import React from 'react';

const Slider = ({ onDrag, onDragStart, onDragEnd, translateX, children }) => {
  return (
    <div
      className='grabbable row__container'
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={true}
    >
      <div
        className='row disable-image-drag slider'
        style={{
          transform: `${translateX ? `translateX(${translateX}px)` : ''}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
