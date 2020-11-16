import React from 'react';

import FileProcessor from './components/FileProcessor';

import './css/App.css';

const App = () => {
  return (
    <div className="container">
      <h2>Lottie JSON to JS Converter</h2>
      <FileProcessor />
    </div>
  );
};

export default App;
