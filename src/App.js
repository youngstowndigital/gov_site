import React, { useEffect } from 'react';
import { getReps, getSenators } from './apiUtil';

function App() {
  const loadData = async () => {
    const reps = await getReps();
    const senators = await getSenators();
    const states = [ ...new Set(senators.map(s => s.state)) ].sort();

    console.log(reps);
    console.log(senators);
    console.log(states);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <h1>Gov Site</h1>
    </div>
  );
}

export default App;
