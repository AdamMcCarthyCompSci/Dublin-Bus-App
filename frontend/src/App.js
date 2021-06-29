import './App.css';
import React from 'react';
import MapContainer from './components/MapContainer';
import { Results } from './components/Results';
import '@fontsource/roboto';
import Grid from "@material-ui/core/Grid";

function App() {
  const [activeStepper, setActiveStepper] = React.useState(0);

  const handleLastStep = () => {
    setActiveStepper(activeStepper - 1);
}

const handleNextStep = () => {
    setActiveStepper(activeStepper + 1);
}


  return (
    <div className="App">
            <MapContainer activeStepper={activeStepper} handleLastStep={handleLastStep} handleNextStep={handleNextStep}/>
            <Results activeStepper={activeStepper} handleLastStep={handleLastStep}/>
    </div>
  );
}

export default App;
