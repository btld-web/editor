import React from 'react';
import { Editor, loader } from "@monaco-editor/react";
import { PreviewComponent } from './PreviewComponent';
import './App.scss';
import { initializeMonacoMdx } from '@mdx-js/monaco';
import * as monaco from 'monaco-editor'



loader.init().then((monaco) => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
        console.log(label);
        switch (label) {
            case 'scss':
              return new Worker(
                new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url),
              )
            default:
              return new Worker(
                new URL('@mdx-js/monaco/mdx.worker.js', import.meta.url),
              )
            /*default:
              return new Worker(
                new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url),
              )*/
        }
    }
  };

  monaco.languages.register({id: 'mdx'});
  initializeMonacoMdx(monaco);
});


export function App() {

  const [codeScss, setCodeScss] = React.useState("<Demo>demo</Demo>");
  const [codeMdx, setCodeMdx] = React.useState("<Demo>demo</Demo>");

  const editorDidMount = (editor, monaco) => {
    console.log(editor, monaco);
    editor.focus();
  };

  const onChangeScss = (value, event) => {
    console.log(value, event);
  };

  const onChangeMdx = (value, event) => {
    console.log(value, event);
  };

  const options = {};

  return (
    <div className="App">
      <Editor
        height="400px"
        defaultLanguage="scss"
        theme="vs-dark"
        defaultValue={codeScss}
        options={options}
        onChange={onChangeScss}
       />
      <Editor
        height="400px"
        defaultLanguage="mdx"
        theme="vs-dark"
        defaultValue={codeMdx}
        options={options}
        onChange={onChangeMdx}
        onMount={editorDidMount}
       />
      <PreviewComponent></PreviewComponent>
    </div>
  );
}