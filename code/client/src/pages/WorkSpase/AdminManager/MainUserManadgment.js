import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import ModalBar from '../../ModalBar/ModalBar'
import axiosReq from '../../../api/axiosReq'
import ReplayIcon from '@material-ui/icons/Replay'
import UsersManadgment from './UsersManadgment'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import s from './InviteUser.module.css'

class InviteUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: false,
      error: false,
      complete: false,
      redirect: false,
      isListOpen:false,
      users: null
    }
    this.getInvintation()
    this.inviteUser = this.inviteUser.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
    this.input = React.createRef()
  }
  changeHandle({currentTarget: {name,value}}) {
    this.setState({[name]: value}, () =>{
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)   
      this.setState({emailValid})
    })
  }
  resend(email) {
    this.sendEmail({email})
  }
  getInvintation() {
    axiosReq.getAllInvintation(localStorage.getItem('token'))
      .then((res) => {this.setState({users: res.data})}) 
  }
  sendEmail(data) {
    axiosReq.inviteUser(data, localStorage.getItem('token'))
      .then((res) => this.setState({complete: res.data.message}))
      .catch((error) => {
        if(error.message === 'Request failed with status code 400'){
          this.setState({ 
            error: error.response.data.message
          })
        }  else this.setState({error: 'ERROR NETWORK'}, () => {
          this.getInvintation()
        } ) 
      })
  }

  inviteUser(e) {
    e.preventDefault()
    const data = {email: this.state.email}
    this.sendEmail(data)
  }
  closeModal = () => {
    this.setState({
      error: false,
      complete: false 
    }, () => this.setState({redirect: true}))
  }
  render() {
    let  usersList
    if (this.state.users) {
      usersList = this.state.users.map(invite => {
        const user = invite.user_id
        const isInviteActive = new Date(invite.expiredAt) > new Date() ? 'ACTIVE' : 'NOT-ACTIVE'
        
        return ( <ListItem key = {user.email} >
          <ListItemAvatar>
            <Avatar 
              alt='User photo'
              src={user.avatar}
            />
          </ListItemAvatar> 
          <ListItemText 
            primary={user.email}
            secondary={isInviteActive}
          /> 
          <IconButton 
            color="primary"
            onClick={() => this.resend(user.email)}
            className={s[isInviteActive.toLowerCase()]}
          >
            <ReplayIcon />
          </IconButton> 
        </ListItem>
        )
      })
    }
    return (<>
        <ModalBar
            msg={this.state.error}
            onClose={this.closeModal}
            severity='error'
            horizontal='right'
        />
        <ModalBar
          msg={this.state.complete}
          onClose={this.closeModal}
          severity='success'
          horizontal='right'
        />
        <Accordion style={{marginTop: '10px'}} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="add-new-user"
          >
            <Typography style={{margin: 'auto'}}>Add New User</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List style={{margin: 'auto'}}>
              <Typography style={{margin: 'auto'}} component="h1" align='center' color='Primary' variant="h5">
                PLEASE ENTER EMAIL 
              </Typography>
              <form onSubmit={this.inviteUser}>
                <TextField
                  inputRef={this.input}
                  error={this.state.error}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.changeHandle}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!this.state.emailValid}
                >
                  Send Link
                </Button>                
              </form>
            </List> 
          </AccordionDetails>
        </Accordion>
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="all-Invintation"
          >
            <Typography style={{margin: 'auto'}}>All Invintation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List style={{margin: 'auto'}} >
              {usersList}
            </List> 
          </AccordionDetails>
        </Accordion>
      </>
    )
  }
}

// вынести ивайт юзер в отдельный файл

export const MainUserManadgment = () => (<Container component="main" maxWidth='lg'>
  <CssBaseline />

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InviteUser/>
      </Grid>

      <Grid item xs={6}>
        <UsersManadgment/>
      </Grid>
    </Grid>

  </Container>
)

