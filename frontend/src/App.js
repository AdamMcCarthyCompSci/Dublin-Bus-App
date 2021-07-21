import './App.css';

import React from 'react';
import MapContainer from './components/MapContainer';
import { FloatingActionButton } from './components/FloatingActionButton';
import UserRegister from './components/UserRegister'
import UserSignIn from "./components/UserSignIn";
import '@fontsource/roboto';

function App() {
    const [menu, setMenu] = React.useState('Home');
    const [login, setLogin] = React.useState(false);
    const [register, setRegister] = React.useState(false);

    return (
        <div className="App">

            <MapContainer menu={menu} setMenu={setMenu}/>
            <FloatingActionButton menu={menu} setMenu={setMenu} setLogin={setLogin} setRegister={setRegister}/>
            <UserRegister show={register} setRegister={setRegister} setLogin={setLogin}/>
            <UserSignIn show={login} setLogin={setLogin}/>
        </div>
    );
}

export default App;
