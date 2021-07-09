import React from 'react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './Map.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';

export function FloatingActionButton({menu, setMenu}) {
    const [state, setState] = React.useState({
        left: false
    })
    // Event handler for when clicking on home/profile/settings/etc.
    const handleListClick = (page) => {
        setMenu(page);
    }
    // Popout drawer to the left
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    }

    return (
        <div className={styles.menuButton}>
                {/* Menu action button and tooltip */}
                 <Tooltip title="Menu" aria-label="menu">
                  <Fab color="primary" aria-label="menu" onClick={toggleDrawer('left', true)}>
                  <MenuIcon />
                  </Fab>
                  </Tooltip>
                  {/* Popout drawer */}
                  <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                      <div className={styles.drawer}
                      role="presentation"
                      onClick={toggleDrawer('left', false)}
                      onKeyDown={toggleDrawer('left', false)}
                      >
                          {/* Items in drawer */}
                          <List>
                            <ListItem 
                            button 
                            key={'Home'} 
                            onClick={() => handleListClick('Home')}
                            selected={menu === 'Home'}
                            >
                                  <ListItemIcon>
                                      <HomeIcon style={{paddingRight: '30'}}/>
                                      <ListItemText primary={'Home'}/>
                                  </ListItemIcon>
                              </ListItem>
                              <ListItem 
                              button 
                              key={'Profile'} 
                              onClick={() => handleListClick('Profile')}
                              selected={menu === 'Profile'}
                              >
                                <ListItemIcon>
                                      <AccountCircleIcon style={{paddingRight: '30'}}/>
                                      <ListItemText primary={'Profile'}/>
                                </ListItemIcon>
                              </ListItem>
                              <ListItem 
                              button 
                              key={'Settings'} 
                              onClick={() => handleListClick('Settings')}
                              selected={menu === 'Settings'}
                              >
                                  <ListItemIcon>
                                      <SettingsIcon style={{paddingRight: '30'}}/>
                                      <ListItemText primary={'Settings'}/>
                                  </ListItemIcon>
                              </ListItem>
                          </List>
                      </div>
                  </Drawer>
        </div>
    )
}