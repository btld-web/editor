import remarkGfm from 'remark-gfm';
import ReactDOM from 'react-dom/client';
import * as runtime from 'react/jsx-runtime';
import { evaluateSync } from '@mdx-js/mdx';
import { createElement } from 'react';
import Sass from 'sass.js/dist/sass.js';


export function generateDom(body, callback) {
    try {
        const mdx = evaluateSync(body, {
            ...runtime,
            remarkPlugins: [remarkGfm]
        }).default
        const mdxReact = createElement(mdx);
        const fragment = document.createDocumentFragment();
        const root = ReactDOM.createRoot(fragment);
        root.render(mdxReact, () => callback(fragment));  
    } catch {}   
}

export function generateCss(body) {
    let url = new URL('sass.js/dist/sass.worker.js', import.meta.url);
    let sass = new Sass(url);
    sass.writeFile('testfile.scss', '.testfile { content: "loaded"; }');
    sass.compile(body, function(result) {
        console.log('!!!', result.text);
    });

    console.log(sass);
}