import React from 'react';
import { Editor } from "@monaco-editor/react";
import { PreviewComponent } from './PreviewComponent';
import './App.scss';
import { generateCss, generateDom } from './generate';

export function App() {

  const [codeScss, setCodeScss] = React.useState(".test {  }");
  const [codeMdx, setCodeMdx] = React.useState("#test <demo>demo</demo>");

  const editorDidMount = (editor, monaco) => {
    console.log(editor, monaco);
    editor.focus();
  };

  const onChangeScss = (value, event) => {
    console.log(value, event);
    generateCss(value);
  };

  const onChangeMdx = (value) => {
    generateDom(value, function (fragment) {
      var root = document.createElement('div');
      root.appendChild(fragment)
      console.log(root.innerHTML);
    });
  };

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

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
        onValidate={handleEditorValidation}
       />
      <Editor
        height="400px"
        defaultLanguage="markdown"
        theme="vs-dark"
        defaultValue={codeMdx}
        options={options}
        onChange={onChangeMdx}
        onMount={editorDidMount}
        onValidate={handleEditorValidation}
       />
      <PreviewComponent></PreviewComponent>
    </div>
  );
}