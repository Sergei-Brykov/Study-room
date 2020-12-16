import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ModalBar from '../ModalBar/ModalBar'

export class CompleteForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      passwordValid: false,
      password: '',
      password2: '',
      email: '',
      error: false,
      complete: false
    }
    this.inputPassword = React.createRef()
    this.inputPassword2 = React.createRef()
    this.checkHash()
    this.changeHandle=this.changeHandle.bind(this)
    this.signInHendler=this.signInHendler.bind(this)
  }
  checkHash() {
    this.props.checkHash({hash: this.props.hash})
      .then((res) => this.setState({email: res.data.email}))
      .catch((error) => {
        let msg = (error.message === 'Request failed with status code 400') 
          ? error.response.data.message
        : 'ERR NETWORK CHANGED'
        this.setState({error: msg})
      })
  }
  changeHandle({currentTarget: {name,value}}) {
    this.setState({[name]: value}, () =>{
      let passwordValid = value.length >= 6
      if (this.state.password === this.state.password2) {
        this.setState({passwordValid})
      } else this.setState({passwordValid: false})
    })
  }
  signInHendler(e) {
    e.preventDefault()
    let data = {
      hash: this.props.hash,
      email: this.state.email,
      password: this.state.password
    }
    this.props.conplete(data)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)  
        if(res.data.oauthId) localStorage.setItem('oauthId', res.data.oauthId)  
        // window.location.reload()
        // костыль номер 2
        this.props.signIn()  
      })
      .catch((error) => {
        let msg
        if(error.message === 'Request failed with status code 400'){
          msg = error.response.data.message
          this.inputPassword.current.value = ''
          this.inputPassword2.current.value = ''
        } else msg = 'ERR NETWORK CHANGED'
        this.setState({error: msg})
      })
  }
  closeModal = () => this.setState({error: false})

  render () {
    return this.state.email ? <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <Typography component="h1" variant="h5">
            {this.props.msg}
            <br/>
            <i>{this.state.email}</i>
            <br/>
            PLEASE INPUT A PASSWORD:
          </Typography>
          <ModalBar
            msg={this.state.error}
            onClose={this.closeModal}
            severity='error'
          />
          <form onSubmit={this.signInHendler}>
            <TextField
              inputRef={this.inputPassword2}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoFocus
              autoComplete="current-password"
              onChange={this.changeHandle}
            />
            <TextField
              inputRef={this.inputPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Repet password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.changeHandle}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!this.state.passwordValid}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
      : <ModalBar
          msg={this.state.error}
          severity='error'
          horizontal='center'
        />

  }
}
