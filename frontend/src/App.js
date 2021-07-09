import './App.css';

import React from 'react';
import MapContainer from './components/MapContainer';
import { FloatingActionButton } from './components/FloatingActionButton';
import '@fontsource/roboto';

import '@fontsource/roboto';





function App() {
  const [menu, setMenu] = React.useState('Home');

  return (
    <div className="App">
            <MapContainer menu={menu}/>
            <FloatingActionButton menu={menu} setMenu={setMenu}/>




    </div>
  );
}

export default App;
