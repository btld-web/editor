import React from 'react';
import { Editor } from "./editor.jsx";
import { PreviewComponent } from './PreviewComponent';
import './App.scss';
import { generateCss, generateDom } from './generate';
import { Slider } from './slider/slider.jsx';
import { Preview } from './preview/preview.jsx';

export function App() {

  const [codeScss, setCodeScss] = React.useState(".test {  }");
  const [codeMdx, setCodeMdx] = React.useState(`
  <>
  <Demo class={{test: true}}>demo</Demo>
  <div n="123" />
  <span><span><span>*!!*</span></span></span>
  {[].map(item => <test>{item} *!!*</test>)}
  </>
  `);

  const options = {};

  return (
    <div className="App">
      <Editor />
      <PreviewComponent></PreviewComponent>
      <Slider></Slider>
      <Preview></Preview>
    </div>
  );
}