export function disableGhostImagesDrag() {
  if (typeof window === 'object') {
    document.addEventListener(
      'dragstart',
      function (event) {
        var img = new Image();
        img.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        event.dataTransfer.setDragImage(img, 0, 0);
      },
      false
    );
  }
}

export function getArray(start, end, arr = []) {
  if (start === 0 && end === arr.length) return arr;

  const result = [...arr];

  const leftOverflow = arr.slice(0, start);

  const rightOverflow = arr.slice(end + 1, arr.length);

  return [...rightOverflow, ...result.splice(start, end), ...leftOverflow];
}

export function getInfiniteArray(arr, direction, additionStep = 3) {
  const result = arr;

  if (direction === 'left') {
    return [
      ...result
        .slice(result.length - additionStep - 1)
        .map((r, i) => ({ ...r, id: `_t${i}${r.id}` })),
      ...result,
    ];
  }

  return [...result, ...result.slice(0, additionStep)].map((r, i) => ({
    ...r,
    id: `_t${i}${r.id}`,
  }));
}
