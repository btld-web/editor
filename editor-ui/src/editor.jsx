import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React from 'react';

export const Editor = () => {

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