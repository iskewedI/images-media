import React, { useMemo, useState } from 'react';
import { useCallback } from 'react/cjs/react.development';
import Slider from '../views/Slider';

const SliderContainer = ({
  itemLength = 150,
  onSlideStart,
  onSlideItem,
  onSlideEnd,
  minimumSlideItemCount = 1,
  slideTimeout = 60,
  children,
}) => {
  const [sliderState, setSliderState] = useState({
    lastSlideMousePosition: {
      x: 0,
      y: 0,
    },
    startMousePosition: {
      x: 0,
      y: 0,
    },
    translateX: 0,
    isDragging: false,
    shouldUpdateParent: false,
    itemLength,
    minimumSlideItemCount,
    slideTimeout,
  });

  const [canSlide, setCanSlide] = useState(true);

  const handleDragStart = useCallback(
    evt => {
      setSliderState(state => ({
        ...state,
        startMousePosition: { x: evt.pageX, y: evt.clientY },
        lastMousePosition: { x: evt.pageX, y: evt.clientY },
        isDragging: true,
      }));
      onSlideStart();
    },
    [setSliderState, onSlideStart]
  );

  const handleDrag = useCallback(
    ({ pageX: currentX, clientY: currentY }) => {
      const { lastMousePosition, startMousePosition } = sliderState;

      if (!canSlide || currentX === lastMousePosition.x || currentX === 0) return;

      const distance = currentX - lastMousePosition.x;

      setSliderState(state => {
        const difference = Math.abs(currentX - startMousePosition.x);
        const slidesPassed = parseInt(difference / itemLength);

        const shouldUpdateParent = slidesPassed >= state.minimumSlideItemCount;

        if (shouldUpdateParent) {
          const direction = startMousePosition.x - currentX < 0 ? 'right' : 'left';

          //UPDATE PARENT
          onSlideItem(slidesPassed, direction);
        }

        let startPosition = shouldUpdateParent
          ? { x: currentX, y: currentY }
          : { ...startMousePosition };

        return {
          ...state,
          lastMousePosition: {
            x: currentX,
            y: currentY,
          },
          startMousePosition: startPosition,
          translateX: shouldUpdateParent ? 0 : state.translateX + distance,
          //   translateX: state.translateX + distance,
          shouldUpdateParent,
        };
      });

      setCanSlide(false);
      setTimeout(() => {
        setCanSlide(true);
      }, sliderState.slideTimeout);
    },
    [sliderState, setSliderState, canSlide, setCanSlide, onSlideItem, itemLength]
  );

  const handleDragEnd = () => {
    setSliderState(state => {
      return {
        ...state,
        isDragging: false,
        translateX: 0,
        shouldUpdateParent: false,
      };
    });
    onSlideEnd();
  };

  return (
    <Slider
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      translateX={sliderState.translateX}
    >
      {children}
    </Slider>
  );
};

export default SliderContainer;
