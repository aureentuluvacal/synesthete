import React from 'react';
import ReactDOM from 'react-dom';

function bigComputation() {
  alert('Big computation in JavaScript');
}

const App = () => {
  return (
    <div>
      <h1>Synesthete</h1>
      <button onClick={bigComputation}>Run Computation</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
