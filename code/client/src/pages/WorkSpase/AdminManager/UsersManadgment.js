import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import axiosReq from '../../../api/axiosReq'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/styles'
import {CircularProgress} from '@material-ui/core'

const styles = {
  block: {
    color: '#d32f2f',
    marginLeft: '15px',
    '&:hover': {
      color: '#b71c1c',
      background: '#ffcdd2'
    }
  },
  center: {
    margin: 'auto'
  },
  unblock: {
    color: '#388e3c',   
    marginLeft: '15px',
    '&:hover': {
      color: '#1b5e20',
      background: '#c8e6c9'
    }
  }
}

class UsersManadgment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      error: false,
      users: null,
      blockUsers: null
    }
    this.getAllUsers = this.getAllUsers.bind(this)
  }
 
  getAllUsers() {
    axiosReq.getAllUsers(localStorage.getItem('token'))
      .then((res) => {
        const users = res.data
        const blockUsers = res.data.filter(user => !user.active)
        console.log(blockUsers)
        this.setState({users, blockUsers})
      })
  }
  blockUser(email) {
    const data = {email}
    axiosReq.blockUser(data, localStorage.getItem('token'))
      .then((res) => {
        this.getAllUsers()
      })
  }
  unBlockUser(email) {
    const data = {email}
    axiosReq.unBlockUser(data,localStorage.getItem('token'))
      .then((res) => {
        this.getAllUsers()
      })
  }
 

  
  render() {
    const { classes } = this.props
    let  usersList
    if (this.state.users) {
      usersList = this.state.users.map(user => {
        return ( <ListItem key = {user.email} >
          <ListItemAvatar>
            <Avatar 
              alt='User photo'
              src={user.avatar}
            />
          </ListItemAvatar> 
          <ListItemText 
            primary={user.email}
            secondary={user.name}
          /> 
          <Button 
            size='small'
            color="secondary"
            className={classes.block}
            disabled={!user.active}
            onClick={() => this.blockUser(user.email)} 
          >
            block
          </Button> 
        </ListItem>
        )
      })
    }
    let  blockUsers
    if (this.state.users) {
      blockUsers = this.state.blockUsers.map(user => {
        return ( <ListItem key = {user.email} >
          <ListItemAvatar>
            <Avatar 
              alt='User photo'
              src={user.avatar}
            />
          </ListItemAvatar> 
          <ListItemText 
            primary={user.email}
            secondary={user.name}
          /> 
          <Button 
            size='small'
            color="secondary"
            className={classes.unblock}
            onClick={() => this.unBlockUser(user.email)} 
          >
            unblock
          </Button> 
        </ListItem>
        )
      })
    }
    return (<>
        <Accordion style={{marginTop: '10px'}} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="ds"
            onClick={this.getAllUsers}
          >
            <Typography className={classes.center}>All Users</Typography>
          </AccordionSummary>
          <AccordionDetails  >
            <List className={classes.center}>
              {usersList || <CircularProgress/>}
            </List> 
          </AccordionDetails>
        </Accordion>
        <Accordion style={{margin:'auto'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="ds"
            onClick={this.getAllUsers}
          >
            <Typography className={classes.center}>Block Users</Typography>
          </AccordionSummary>
          <AccordionDetails >
            <List className={classes.center} >
              {blockUsers || <CircularProgress/>}
            </List> 
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
}

export default withStyles(styles)(UsersManadgment)