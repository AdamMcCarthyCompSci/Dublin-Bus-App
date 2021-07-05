import './App.css';
import React from 'react';
import MapContainer from './components/MapContainer';
import { Results } from './components/Results';
import { FloatingActionButton } from './components/FloatingActionButton';
import '@fontsource/roboto';
import Grid from "@material-ui/core/Grid";

function App() {
  const [value, setValue] = React.useState(0);
  const [showSearch, setShowSearch] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == 0) {
      setShowSearch(true);
    }
    if (newValue == 1 || newValue == 2) {
      setShowSearch(false);
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    if (index == 0) {
      setShowSearch(true);
    }
    if (index == 1 || index == 2) {
      setShowSearch(false);
    }
  };

  return (
    <div className="App">
            <MapContainer showSearch={showSearch}/>
            <FloatingActionButton />
            <Results handleChange={handleChange} handleChangeIndex={handleChangeIndex} value={value}/>
    </div>
  );
}

export default App;
