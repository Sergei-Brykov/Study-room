import React from 'react'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'
import {parseJwt} from '../../../util/parseJwt'
import { Grid } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import Box from '@material-ui/core/Box';
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import axiosReq from '../../../api/axiosReq'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import axios from 'axios'



const styles = {
  root: {
    marginTop: '8px'
  },
  avatar: {
    textAlign: 'center',
  },
  name: {
    textAlign: 'left',
  },
  input: {
    display: 'none'
  },
  img: {
    width: '540px',
    height: '540px',
  }

}

class MainProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: parseJwt(localStorage.getItem('token')),
      isAuth: localStorage.getItem('oauthId'),
      avatar: null,
      name: null
    }
    
    this.setAvatar = this.setAvatar.bind(this)
    this.setName = this.setName.bind(this)
    this.input = React.createRef()
    this.ListItem = React.createRef()
  }
  getAvatar() {
    axiosReq.getAvatar(localStorage.getItem('token'))
      .then((res) => this.setState({avatar: res.data.avatar}))
  }
  getName() {
    axiosReq.getName(localStorage.getItem('token'))
      .then((res) => this.setState({name: res.data.name}))
  }
  setAvatar(e) {
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])



    axios.post('/api/set-avatar', formData, { headers: { 
        'Content-Type': 'multipart/form-data',
        'x-authorization': localStorage.getItem('token')
      }})
      .then(() => {this.getAvatar()})
  }
  setName(e) {
    e.preventDefault()
    const data = {name: this.input.current.value}
    axiosReq.setName(data, localStorage.getItem('token'))
      .then(() => {
        this.getName()
      })
  }

  componentDidMount() {
    this.getAvatar()
    this.getName()
    if (this.ListItem.current.innerHTML === '') this.ListItem.current.innerHTML = '<NickName>'
  }
  
  render() {
    const { classes } = this.props

    return <Container component="div" maxWidth="md" className={classes.root} >
      <Grid container>
        <Grid item xs={8} >
          <Accordion className={classes.avatar}>
            <AccordionSummary              
              aria-controls="panel1a-content"
              id="avatar-controls"
            >
              <Avatar 
                alt='User photo'
                src={this.state.avatar}
                className={classes.img}
              />
              <input 
                accept="image/*" 
                className={classes.input} 
                id="avatar-button-file" 
                type="file"
                onChange={this.setAvatar}
              />
              <label htmlFor="avatar-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera/>
                </IconButton>
              </label>
            </AccordionSummary>
        
          </Accordion>
          <Accordion className={classes.name}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="avatar-controls"
            >
              <label htmlFor={'cnahge-name'} style={{marginRight:'40px'}}>
                <ListItemText
                  ref={this.ListItem}
                  primary={this.state.name || "<NickName>"}
                  secondary='Change nickname'
                /> 
              </label>
              <form onSubmit={this.setName} style={{width: '100%'}} >
                <TextField
                  inputRef={this.input}
                  margin="normal"
                  required
                  defaultValue={this.state.password}
                  name="cnahge-name"
                  label="Enter your name"
                  type="text"
                  id="cnahge-name"
                  autoComplete="current-password"
                  fullWidth
                />
                <Box >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Change NickName
                  </Button>
                </Box>
              </form>
            </AccordionSummary>
          </Accordion>
          {!this.state.isAuth ? <Grid container direction='row' spacing={3} style={{marginTop: '10px'}}>
            <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary">
              <a style={{color: 'white'}} href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect-g&client_id=40110997985-t3avnabmonft6ehaks9546qfpj895ju7.apps.googleusercontent.com&access_type=offline&scope=email&flowName=GeneralOAuthFlow"> GOOGLE </a>
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button fullWidth variant="contained"  color="primary">
              <a style={{color: 'white'}} href='https://www.facebook.com/v9.0/dialog/oauth?client_id=204719204443156&redirect_uri=http://localhost:3000/oauth-redirect-f&scope=email'>FACEBOOK</a>
            </Button>
            </Grid>
          </Grid>
          : null}
        </Grid>
        <Grid item xs={4}>
          
        </Grid>

      </Grid>
    </Container>
  }
}
export default withStyles(styles)(MainProfile)