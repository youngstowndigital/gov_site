import React, { useEffect, useState } from 'react';
import { prettyPrintJson } from 'pretty-print-json';
import { AppBar, Toolbar, IconButton, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getReps, getSenators } from './apiUtil';
import { Container } from '@mui/system';
import ContactInfo from './components/ContactInfo';

function App() {
  const [loading, setLoading] = useState(false);
  const [repType, setRepType] = useState('senator');
  const [state, setState] = useState('AL');
  const [states, setStates] = useState([]);
  const [senators, setSenators] = useState([]);
  const [reps, setReps] = useState([]);
  const [selectedRep, setSelectedRep] = useState('');

  const loadData = async () => {
    setLoading(true);
    const reps = await getReps();
    const senators = await getSenators();
    const states = [ ...new Set(senators.map(s => s.state)) ].sort();

    setReps(reps);
    setSenators(senators);
    setStates(states);
    setLoading(false);
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
            Gov Site
          </Typography>
        </Toolbar>
      </AppBar>
      {
        loading ?
        <CircularProgress sx={{ display: 'block', margin: '40vh auto 0 auto' }} />
        :
        <Container maxWidth="lg">
          <Typography variant='h2' sx={{ marginTop: '20px' }}>Gov Site</Typography>
          <FormControl fullWidth sx={{ marginBottom: '20px', marginTop: '10px' }}>
            <InputLabel>Who would you like to contact?</InputLabel>
            <Select
              value={repType}
              label="Who would you like to contact?"
              onChange={(e) => setRepType(e.target.value)}
            >
              <MenuItem value='senator'>Senator</MenuItem>
              <MenuItem value='representative'>Representative</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <InputLabel>What state do you live in?</InputLabel>
            <Select
              value={state}
              label="Who would you like to contact?"
              onChange={(e) => setState(e.target.value)}
            >
              {
                states.map(s => <MenuItem value={s} key={s}>{ s }</MenuItem>)
              }
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <InputLabel>Who do you want to contact?</InputLabel>
            <Select
              value={selectedRep}
              label="Who would you like to contact?"
              onChange={(e) => setSelectedRep(e.target.value)}
            >
              {
                repType === 'senator' ?
                senators.filter(s => s.state === state).map(s => <MenuItem value={s.id}>{ `${s.first_name} ${s.last_name}` }</MenuItem>)
                :
                reps.filter(r => r.state === state).map(r => <MenuItem value={r.id}>{ `${r.first_name} ${r.last_name}` }</MenuItem>)
              }
            </Select>
          </FormControl>
          {
            selectedRep ?
            <ContactInfo rep={ repType === 'senator' ? senators.filter(s => s.id === selectedRep)[0] : reps.filter(r => r.id === selectedRep)[0] } />
            :
            ''
          }
          <br />
          <br />
          {
            repType === 'senator' ?
            <div dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(senators.filter(s => s.id === selectedRep)[0], null, 2, 100) }} />
            :
            <div dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(reps.filter(r => r.id === selectedRep)[0], null, 2, 100) }} />
          }
        </Container>
      }
    </div>
  );
}

export default App;
