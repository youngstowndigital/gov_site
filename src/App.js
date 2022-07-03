import React, { useEffect, useState } from 'react';
import { prettyPrintJson } from 'pretty-print-json';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getReps, getSenators } from './apiUtil';
import { Container } from '@mui/system';

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
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
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
          <div dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(senators.filter(s => s.id === selectedRep)[0], null, 2, 100) }} />
          :
          <div dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(reps.filter(r => r.id === selectedRep)[0], null, 2, 100) }} />
        }
      </Container>
    </div>
  );
}

export default App;
