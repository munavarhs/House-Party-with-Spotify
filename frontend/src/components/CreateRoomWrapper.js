import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';

const CreateRoomWrapper = () => {
    const navigate = useNavigate();
    return <CreateRoomPage navigate={navigate} />;
};

export default CreateRoomWrapper;
