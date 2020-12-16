import React from 'react'
import {Button, Box, Container} from '@material-ui/core'
import {parseJwt} from '../../util/parseJwt'
import { withStyles } from '@material-ui/styles'
import MainVideo from './VideoComponent/MainVideo'
import MainFileSpace from './FileSpace/MainFileSpace'
import MainChat from './Chat/MainChat'

const styles = {
  item: {
    width: '50%',
    float: 'left'
  }
}
class MainWorkSpase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: parseJwt(localStorage.getItem('token')),
      isAuth: localStorage.getItem('oauthId'),
    }
    
  }
  logOut() {
    localStorage.clear()
    window.location.reload()
  }
  render () {
    const { classes } = this.props
    let oAuth
    if(!this.state.isAuth) {
      oAuth = (<Box mt={2}>
        <Button variant="contained" color="primary">
          <a style={{color: 'white'}} href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth-redirect-g&client_id=40110997985-t3avnabmonft6ehaks9546qfpj895ju7.apps.googleusercontent.com&access_type=offline&scope=email&flowName=GeneralOAuthFlow"> GOOGLE </a>
        </Button>
        <Button variant="contained" style={{marginLeft: '10px'}} color="primary">
          <a style={{color: 'white'}} href='https://www.facebook.com/v9.0/dialog/oauth?client_id=204719204443156&redirect_uri=http://localhost:3000/oauth-redirect-f&scope=email'>FACEBOOK</a>
        </Button>          
      </Box>)
    }
    return (<Box>
        <Box className={classes.item}>
          <Box>
            <MainVideo/>
          </Box>
          <Box >
            <MainFileSpace/>
          </Box>        
        </Box>
        <Box className={classes.item}>
          <MainChat/>
        </Box>
      </Box>
    )
  }
}

export default withStyles(styles)(MainWorkSpase)