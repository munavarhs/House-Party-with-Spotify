import React, { Component } from 'react';
import CreateRoomWrapper from './CreateRoomWrapper';
import RoomWrapper from './RoomWrapper';
import RoomJoinPageWrapper from './RoomJoinPageWrapper';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import Info from './info';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this)
  }

  async componentDidMount() {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomepage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode(){
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Routes>
          {/* Conditional navigation based on roomCode */}
          <Route
            path="/"
            element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomepage()
              )
            }
          />
          {/* Other routes */}
          <Route path="/join" element={<RoomJoinPageWrapper />} />
          <Route path="/info" element={<Info />} />
          <Route path="/create" element={<CreateRoomWrapper />} />
          <Route path="/room/:roomCode" element={<RoomWrapper leaveRoomCallback={this.clearRoomCode}/>} />
        </Routes>
      </Router>
    );
  }
}
