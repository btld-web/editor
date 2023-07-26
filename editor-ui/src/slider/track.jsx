import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Track() {
  const {setNodeRef} = useDroppable({id: 'track'});

  return (
    <div className={'track'} ref={setNodeRef}></div>
  );
}