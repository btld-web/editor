import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { sass } from "@codemirror/lang-sass";
import React from 'react';

export const Editor = ({lang}) => {

    let view;

    function initEditor(parent) {
        if (view || !parent) return;

        view = new EditorView({
            parent,
            doc: "let x = <y></y>;",
            extensions: [
              basicSetup,
              javascript({jsx: true})
            ]
        });
    }

    return <div ref={initEditor}></div>;
};