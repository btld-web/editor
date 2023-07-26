import './slider.scss';

import React from 'react';
import { Handle } from './handle.jsx';
import { Track } from './track.jsx';
import { DndContext } from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

const modifiers = [restrictToParentElement, restrictToHorizontalAxis];

export function Slider() {

    let [x, setX] = React.useState(0);

    return <DndContext
    autoScroll={false}
    modifiers={modifiers}
    onDragEnd={handleDragEnd}
    >
        <div className="slider">
            <Track />
            <Handle x={x} />
        </div>
    </DndContext>;

  function handleDragEnd({delta}) {
    console.log('DragEnd', delta);
    setX(x + delta.x);
  }
}
