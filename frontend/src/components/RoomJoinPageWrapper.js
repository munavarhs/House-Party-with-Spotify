import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';

const RoomJoinPageWrapper = (props) => {
    const navigate = useNavigate();
    return <RoomJoinPage {...props} navigate={navigate} />;
};

export default RoomJoinPageWrapper;
