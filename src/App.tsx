import React, { useState } from 'react';
import './stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reader from './components/Reader';
import Editor from './components/Editor';

function App() {
  const [content, setContent] = useState(``);

  function renewContent(newContent: string) {
    setContent(newContent);
  }

  return (
    <div className="App container">
      <div className="row">
        <Editor renewContent={renewContent} />
        <Reader content={content} />
      </div>
    </div>
  );
}

export default App;
