import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import {NavLink} from 'react-router-dom'
export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  logOut() {
    localStorage.clear()
    window.location.reload()
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.props.openNavBar} 
            edge="start" 
            color="inherit" 
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <NavLink 
            style={{color: 'white', flexGrow: 1}} 
            to='/'
          >
            <Typography variant="h6">
              STUDY BOARD
            </Typography>
          </NavLink>
          <Button  onClick={this.logOut} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
