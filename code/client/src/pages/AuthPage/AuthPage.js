import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ModalBar from '../ModalBar/ModalBar'
import axiosReq from '../../api/axiosReq'



class AuthPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      formValid: false,
      error: false,
      inputError: false,
      open: true,
      redirect: false
    }
    this.signInHendler = this.signInHendler.bind(this)
    this.validateField = this.validateField.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
    this.inputPassword = React.createRef()
  }
  changeHandle({currentTarget: {name,value}}) {
    this.setState({[name]: value}, () => this.validateField(name, value))
  }
  validateField(nameField, value) {
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid
    switch (nameField) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        break
      case 'password':
        // какаято логика валидации пароля
        passwordValid = value.length >= 6
        break
      default:
        break
    }
    this.setState({emailValid, passwordValid}, () => {
      this.setState({formValid: this.state.emailValid && this.state.passwordValid})
    })
  }
  async signInHendler(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    axiosReq.signIn(data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        if (res.data.oauthId) localStorage.setItem('oauthId', res.data.oauthId)
        // костыль номер 1
        // window.location.reload() 
        // костыль номер 2
        this.props.signIn()
        // this.props.history.push('/')   
      })
      .catch((error) => {
        console.dir(error)
        if(error.message === 'Request failed with status code 400'){
          this.inputPassword.current.value = ''
          this.setState({ 
            error: error.response.data.message,
            formValid: false,
            inputError: true
          }, () => {
            this.inputPassword.current.focus()
          })
        }  else {
          this.setState({ 
            error: 'ERR NETWORK CHANGED',
          })
        }        
      })
  }
  closeModal = () => {
    this.setState({
      error: false,
      inputError: false
    })
  }
  render() {
    return (  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <ModalBar
            msg={this.state.error}
            onClose={this.closeModal}
            severity='error'
          />
          <Typography component="h1" align='center' variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.signInHendler}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              defaultValue={this.state.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.changeHandle}
            />
            <TextField
              error={this.state.inputError}
              helperText={this.state.error}
              inputRef={this.inputPassword}
              variant="filled"
              margin="normal"
              required
              fullWidth
              defaultValue={this.state.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.changeHandle}
            />
            <Box mt={1}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!this.state.formValid}
              >
                Sign In
              </Button>
            </Box>             
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary">
              <a style={{color: 'white'}}  href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-google-login&client_id=40110997985-t3avnabmonft6ehaks9546qfpj895ju7.apps.googleusercontent.com&access_type=offline&scope=email&flowName=GeneralOAuthFlow"> GOOGLE </a>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary">
              <a style={{color: 'white'}}  href='https://www.facebook.com/v9.0/dialog/oauth?client_id=204719204443156&redirect_uri=http://localhost:3000/oauth-facebook-login&scope=email'>FACEBOOK</a>
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default AuthPage