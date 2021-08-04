import React from 'react';
import Button from '@material-ui/core/Button';
import LoopIcon from '@material-ui/icons/Loop';
import Zoom from '@material-ui/core/Zoom';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export function LeaveArriveButton({leaveArrive, setLeaveArrive, setNewDirections}) {

    const handleLeaveArrive = () => {
        setLeaveArrive((leaveArrive === 'Leave At:') ? 'Arrive At:' : 'Leave At:');
        setNewDirections(true); 
    }

    return (
        <React.Fragment>
            {leaveArrive === 'Leave At:'
            &&
            <Zoom in={leaveArrive === 'Leave At:'}> 
            <Button
            variant="contained"
            color="primary"
            startIcon={<LoopIcon />}
            size="large"
            style={{marginTop: "-10px"}}
            onClick={() => handleLeaveArrive()}
            >
                {leaveArrive}
            </Button>
            </Zoom>
            }

            {leaveArrive === 'Arrive At:'
            &&
            <Zoom in={leaveArrive === 'Arrive At:'}>
            <Button
            variant="contained"
            color="primary"
            startIcon={<AutorenewIcon />}
            size="large"
            style={{marginTop: "-10px"}}
            onClick={() => handleLeaveArrive()}
            >
                {leaveArrive}
            </Button>
            </Zoom>
            }
        </React.Fragment>
    )
}