import React, { useMemo, useState } from 'react';
import { useCallback } from 'react/cjs/react.development';
import { getArray, getInfiniteArray } from '../../utils/mainUtils';
import ImageRow from '../views/ImageRow';
import SliderContainer from './SliderContainer';

const ImageRowContainer = ({ images = [], indexStart = 0, indexEnd = 13 }) => {
  const [rowState, setRowState] = useState({
    indexStart,
    indexEnd,
    isSliding: false,
    shouldUpdateImages: false,
    directionSlide: '',
  });

  const handleSlideStart = () => {
    setRowState(state => ({
      ...state,
      isSliding: true,
    }));
  };

  const handleSlideItems = (count, direction) => {
    const imagesLength = images.length;

    setRowState(state => {
      let indexStart = state.indexStart;
      let indexEnd = state.indexEnd;

      if (direction === 'right') {
        const previousItemIndex =
          (state.indexStart + imagesLength - count) % imagesLength;

        indexStart = previousItemIndex;
        indexEnd = state.indexEnd + count;
      } else {
        const nextItemIndex = (state.indexStart + count) % imagesLength;

        indexStart = nextItemIndex;
        indexEnd = state.indexEnd + count;
      }

      return {
        ...state,
        indexStart,
        indexEnd,
        shouldUpdateImages: true,
        directionSlide: direction,
      };
    });
  };

  const handleSlideEnd = () => {
    setRowState(state => {
      return {
        ...state,
        isSliding: false,
        shouldUpdateImages: false,
      };
    });
  };

  let imagesToShow = useMemo(() => {
    const imagesToShow = getArray(rowState.indexStart, rowState.indexEnd, images).slice(
      0,
      9
    );

    if (!rowState.shouldUpdateImages) {
      return imagesToShow;
    }

    return getInfiniteArray(imagesToShow, rowState.directionSlide, 2, 9); //Unnecesary?
  }, [
    images,
    rowState.indexStart,
    rowState.indexEnd,
    rowState.directionSlide,
    rowState.shouldUpdateImages,
  ]);

  return (
    <SliderContainer
      onSlideStart={handleSlideStart}
      onSlideItem={handleSlideItems}
      onSlideEnd={handleSlideEnd}
      minimumSlideItemCount={1}
    >
      <ImageRow images={imagesToShow} isSliding={rowState.isSliding} />
    </SliderContainer>
  );
};

export default ImageRowContainer;
