import React, { useEffect, useState } from 'react';
import { getReps, getSenators } from './apiUtil';

function App() {
  const [repType, setRepType] = useState('senator');
  const [state, setState] = useState('AL');
  const [states, setStates] = useState([]);
  const [senators, setSenators] = useState([]);
  const [reps, setReps] = useState([]);
  const [selectedRep, setSelectedRep] = useState('');

  const loadData = async () => {
    const reps = await getReps();
    const senators = await getSenators();
    const states = [ ...new Set(senators.map(s => s.state)) ].sort();

    setReps(reps);
    setSenators(senators);
    setStates(states);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <h1>Gov Site</h1>
      <label>Who would you like to contact?</label>
      <br />
      <select value={repType} onChange={(e) => setRepType(e.target.value)}>
        <option value='senator'>Senator</option>
        <option value='representative'>Representative</option>
      </select>
      <br />
      <label>What state do you live in?</label>
      <br />
      <select value={state} onChange={(e) => setState(e.target.value)}>
        {
          states.map(s => <option value={s} key={s}>{ s }</option>)
        }
      </select>
      <br />
      <label>Which rep would you like to contact?</label>
      <br />
      <select value={selectedRep} onChange={(e) => setSelectedRep(e.target.value)}>
        <option>Select:</option>
        {
          repType === 'senator' ?
          senators.filter(s => s.state === state).map(s => <option value={s.id}>{ `${s.first_name} ${s.last_name}` }</option>)
          :
          reps.filter(r => r.state === state).map(r => <option value={r.id}>{ `${r.first_name} ${r.last_name}` }</option>)
        }
      </select>
      {
        repType === 'senator' ?
        JSON.stringify(senators.filter(s => s.id === selectedRep))
        :
        JSON.stringify(reps.filter(r => r.id === selectedRep))
      }
    </div>
  );
}

export default App;
