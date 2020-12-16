import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {NavLink} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Box from '@material-ui/core/Box'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Chat from '@material-ui/icons/Chat'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home'
import VideoCall from '@material-ui/icons/VideoCall'
import Settings from '@material-ui/icons/Settings'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {parseJwt} from '../../../util/parseJwt'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';



export default function NavBar(props) {

  const [user] = React.useState(parseJwt(localStorage.getItem('token')))

  return (
    <Drawer 
      open={props.open}
      onClick={props.close}  
    >
      <List>
        <ListItem button key='closeNavBar'>
          <ListItemIcon >
            <Box ml={30}>
              <ChevronLeftIcon />
            </Box>
          </ListItemIcon>
        </ListItem>

        <NavLink to='/home'>
          <ListItem button key='Invite' divider >
            <ListItemIcon >
              <Home/>
            </ListItemIcon>
            <ListItemText 
              primary={'Home'} 
              secondary={'Some Text'}
            />
          </ListItem>
        </NavLink>

        <NavLink to='/profile'>
          <ListItem button key='profile' divider >
            <ListItemIcon >
              <AccountCircleIcon/>
            </ListItemIcon>
            <ListItemText 
              primary={'Profile'} 
              secondary={'User profile'}
            />
          </ListItem>
        </NavLink>

        {user.role === 'admin' ? <NavLink to='/users-management'>
          <ListItem button key='users management' divider >
            <ListItemIcon >
              <AccessibilityNewIcon/>
            </ListItemIcon>
            <ListItemText 
              primary={'ADMIN'} 
              secondary={'Users management'}
            />
          </ListItem>
        </NavLink> 
        : null}

        <NavLink to='/chat'>
          <ListItem button key='Chat' divider >
            <ListItemIcon >
              <Chat/>
            </ListItemIcon>
            <ListItemText 
              primary={'Chat'} 
              secondary={'yooooo'}
            />
          </ListItem>
        </NavLink>

        <NavLink to='/video'>
          <ListItem button key='Video   Call' divider >
            <ListItemIcon >
              <VideoCall/>
            </ListItemIcon>
            <ListItemText 
              primary={'Video Call'} 
              secondary={'yooooo'}
            />
          </ListItem>
        </NavLink>

        <NavLink to='/settings'>
          <ListItem button key='Settings'  >
            <ListItemIcon>
              <Settings/>
            </ListItemIcon>
            <ListItemText primary={'Settings'} secondary={'Settings'} />
          </ListItem>
        </NavLink>
      </List>
    </Drawer>
  );
}