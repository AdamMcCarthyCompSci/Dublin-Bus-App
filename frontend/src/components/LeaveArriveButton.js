import React from 'react';
import Button from '@material-ui/core/Button';
import LoopIcon from '@material-ui/icons/Loop';
import Zoom from '@material-ui/core/Zoom';
import AutorenewIcon from '@material-ui/icons/Autorenew';

export function LeaveArriveButton({leaveArrive, setLeaveArrive, setNewDirections}) {

    const handleLeaveArrive = () => {
        setLeaveArrive((leaveArrive === 'Leave:') ? 'Arrive:' : 'Leave:');
        setNewDirections(true); 
    }

    return (
        <React.Fragment>
            {leaveArrive === 'Leave:'
            &&
            <Zoom in={leaveArrive === 'Leave:'}> 
            <Button
            variant="contained"
            color="primary"
            startIcon={<LoopIcon />}
            style={{marginTop: "-10px"}}
            onClick={() => handleLeaveArrive()}
            >
                {leaveArrive}
            </Button>
            </Zoom>
            }

            {leaveArrive === 'Arrive:'
            &&
            <Zoom in={leaveArrive === 'Arrive:'}>
            <Button
            variant="contained"
            color="primary"
            startIcon={<AutorenewIcon />}
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