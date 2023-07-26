import React from 'react';
import classNames from 'classnames';
import {useDraggable} from '@dnd-kit/core';

export function Handle({x}) {
  const {isDragging, listeners, transform, setNodeRef} = useDraggable({
    id: 'handle',
  });

  console.log(x, transform?.x);

  const style = { 
    '--transform': `${transform?.x ?? 0}px`,
    '--position-x': `${x ?? 0}px`,
  };

  return (
    <span 
        className={classNames("handle", {dragging: isDragging})}
        ref={setNodeRef}
        style={style}
        {...listeners}>
    </span>
  );
}