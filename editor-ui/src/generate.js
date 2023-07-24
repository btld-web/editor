
import ReactDOM from 'react-dom/client';
import * as runtime from 'react/jsx-runtime';
import { compile } from '@mdx-js/mdx';
import { createElement } from 'react';
import Sass from 'sass.js/dist/sass.js';

import { unified } from 'unified';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js';
import remarkRehype from 'remark-rehype';


export function generateDom(body, callback) {
    try {
        const pipeline = unified();
        pipeline
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkMarkAndUnravel)
        
        const tree = pipeline.parse(body);
        console.log(tree);

    } catch (e) {
        console.error(e);
    }   
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