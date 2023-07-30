import './preview.scss';
import panzoom from 'panzoom';

import React from 'react';

export function Preview() {

    function onRef(ref) {
        panzoom(ref);
    }

    return <div class="editor-preview">
        <iframe ref={onRef} src="https://www.youtube.com"></iframe>
        <div class="partially-hidden">
            <canvas></canvas>
        </div>
    </div>;
}