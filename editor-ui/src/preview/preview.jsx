import './preview.scss';
import panzoom from 'panzoom';

import React from 'react';

export function Preview() {

    function onRef(ref) {
        const instance = panzoom(ref);
        instance.on('transform', function(e) {
            console.log(e);
            console.log(e.getTransform())
        });
    }

    return <div className="editor-preview">
        <div className="panzoom" ref={onRef}></div>
        <iframe src="https://www.youtube.com"></iframe>
        <div className="partially-hidden">
            <canvas></canvas>
        </div>
    </div>;
}