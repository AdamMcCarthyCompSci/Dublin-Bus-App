import './App.css';
import MapContainer from './components/MapContainer';
import { Results } from './components/Results';
import '@fontsource/roboto';
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
            {/* <Grid container spacing={0}>
              <Grid item xs={12}>
                <MapContainer />
              </Grid>
              <Grid item xs={4}>
              </Grid>
              <Grid item xs={4}>
                <Results />
              </Grid>
              <Grid item xs={4}>
              </Grid>
            </Grid> */}
            <MapContainer />
            <Results />
    </div>
  );
}

export default App;
