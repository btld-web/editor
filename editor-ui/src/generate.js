
import ReactDOM from 'react-dom/client';
import * as runtime from 'react/jsx-runtime';
import { compile } from '@mdx-js/mdx';
import { createElement } from 'react';
import Sass from 'sass.js/dist/sass.js';
import * as Babel from '@babel/standalone';

import { unified } from 'unified';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js';
import remarkRehype from 'remark-rehype';

function myCustomPlugin({types: t}) {
    return {
        visitor: {
            Identifier(path) {
                // in this example change all the variable `n` to `x`
                if (path.isIdentifier({ name: 'n' })) {
                    path.node.name = 'x';
                }
            },
            Program(path) {
                console.log('AST????', path);
            },

            JSXOpeningElement(path) {
                console.log('JSX Open: ', path.node.name);
            },

            JSXClosingElement(path) {
                console.log('JSX Close: ', path.node.name);
            },

            JSXFragment(path) {
                console.log('Fragment', path, path?.parentPath, path?.parentPath?.parentPath);
            }
        },
    };
}

//syntax-jsx
//transform-react-jsx

export function generateDom(body, callback) {
    var output = Babel.transform(body, {
        plugins: [
            Babel.availablePlugins['syntax-jsx'],
            myCustomPlugin,
            /*[Babel.availablePlugins['transform-react-jsx'], {
            runtime: 'classic',
            pragma: 'h',
            pragmaFrag: 'Fragment',
            useSpread: true
        }]*/]
    }).code;
    console.log('!!!!!!!', output);
    //console.log(Babel.availablePlugins)
    try {
        const pipeline = unified();
        pipeline
            .use(remarkParse)
            .use(remarkMdx)
            .use(remarkMarkAndUnravel)
        
        const tree = pipeline.parse(body);
        //console.log(tree);

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