import React, {useState, useEffect} from "react";
import {Grid, Button, Typography, IconButton} from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Link} from "react-router-dom";

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create',
}

export default function Info(props){
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo(){
    return (
        <h4>Join page Information</h4>
    );
  }

  function createInfo(){
    return (
        <h4>Create page Information</h4>
    );
  }

  function createMoreInfo(){
    return "If you are hosting a party, create a room and share it with your friends so that they can listen the same song you are listening, They can just join the room with your shared code and they don't have any permissions unless you provide them any."
  }

  function joinMoreInfo(){
    return "Join the room if you have a valid code. Enjoy the songs, if you don't like them vote to skip."
  }
  return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
            What is House Party?
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="body1">
            {page == pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="body1">
            {page == pages.JOIN ? joinMoreInfo() : createMoreInfo()}
        </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <IconButton 
            onClick={()=>{page === pages.CREATE ? setPage(pages.JOIN): setPage(pages.CREATE)}}>
                {page === pages.CREATE ? <NavigateBeforeIcon />: <NavigateNextIcon />}
            </IconButton>
        </Grid>
        <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>
    </Grid>
  )
}





