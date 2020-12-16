import React from 'react'
import {CircularProgress} from '@material-ui/core'
import ModalBar from '../ModalBar/ModalBar'
import axiosReq from '../../api/axiosReq'
import { withStyles } from '@material-ui/styles'
import Backdrop from '@material-ui/core/Backdrop'

const styless = (theme) =>  ({
  backdrop: {
    zIndex: 999,
    color: '#fff',
  }
})

class FacebookOauth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      complete: false,
      error: false
    }
    this.oAuth()
    
  }
  async oAuth() {
    const code = window.location.search.slice(1).split('&')[0].slice(5)
    const data = {code}
    axiosReq.facebookOauth(data, localStorage.getItem('token'))
      .then((res) => {
        localStorage.setItem('oauthId', res.data.oauthId)
        this.setState({complete: 'You acount linked google'}) 
      }).catch((error) => {
        let msg
        if(error.message === 'Request failed with status code 400') {
          msg = error.response.data.message
        } else msg = 'ERR NETWORK CHANGED'
        this.setState({error: msg})
      }) 
  }
  closeModal = () => {
    this.setState({
      error: false,
      complete: false,
    },() => this.props.history.push('/'))
  }
  
  render() {
    const { classes } = this.props
    return <>
      <ModalBar
        msg={this.state.error}
        onClose={this.closeModal}
        severity='error'
        horizontal='center'
      />
      <ModalBar
        msg={this.state.complete}
        onClose={this.closeModal}
        severity='success'
        horizontal='center' 
      /> 
    </> || <Backdrop 
      open={true} 
      className={classes.backdrop}
    >
      <CircularProgress/>
    </Backdrop> 
  }
}

export default withStyles(styless)(FacebookOauth)