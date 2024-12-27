import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Room from './Room';

const RoomWrapper = (props) => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    return (
        <Room 
            {...props} 
            roomCode={roomCode} 
            navigate={navigate} 
        />
    );
};

export default RoomWrapper;

