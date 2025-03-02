import React from 'react';
import ReactDOM from 'react-dom/client';
import FileUploader from './FileUploader';

function App() {
  return (
    <div>
      {/* <h1 className="text-center text-2xl font-bold mb-4">Welcome my friend</h1> */}
      <FileUploader />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
