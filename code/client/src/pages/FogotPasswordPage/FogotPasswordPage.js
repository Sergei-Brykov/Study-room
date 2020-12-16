import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ModalBar from '../ModalBar/ModalBar'
import axiosReq from '../../api/axiosReq'

export class FogotPasswordPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailValid: false,
      error: false,
      complete: false,
      message: false
    }
    this.sendLinkHendler = this.sendLinkHendler.bind(this)
    this.closeModal= this.closeModal.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }
  changeHandle({currentTarget: {name,value}}) {
    this.setState({[name]: value}, () =>{
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)   
      this.setState({emailValid})
    })
  }
  async sendLinkHendler(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
    }
    axiosReq.fogotPassword(data)
      .then((res) => {this.setState({complete: res.data.message})})
      .catch((error) => {
        if(error.message === 'Request failed with status code 400'){
          this.setState({ 
            error: error.response.data.message,
            formValid: false,
            inputError: true
          })
        }  else {
          this.setState({ 
            error: 'ERR NETWORK CHANGED',
          })
          
        } 
      })    
  }
  closeModal() {
    this.setState({
      error: false,
    })
  }

  render() {
    return !this.state.complete ? <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <ModalBar
            msg={this.state.error}
            onClose={this.closeModal}
            severity='error'
          />
          <Typography component="h1" variant="h5">
            PLEASE ENTER EMAIL 
          </Typography>
          <form onSubmit={this.sendLinkHendler}>
            <TextField
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
        </div>
        
      </Container>
    : <Container component="main" maxWidth="xs">
    <Typography component="h1" variant="h5">
    {this.state.complete}
    </Typography>    
  </Container>
  }
}
