import React from 'react'
import {CircularProgress} from '@material-ui/core'
import ModalBar from '../ModalBar/ModalBar'
import axiosReq from '../../api/axiosReq'




export class GoogleOauth extends React.Component {
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
    const code = decodeURIComponent(window.location.search.slice(1).split('&')[0].slice(5))
    const data = {code}
    axiosReq.googleOauth(data, localStorage.getItem('token'))
      .then((res) => {
        localStorage.setItem('oauthId', res.data.oauthId)
        this.setState({complete: 'You acount linked google'})
      })
      .catch((error) => {
        let msg
        if(error.message === 'Request failed with status code 400') {
          msg = error.response.data.message
        } else msg = 'ERR NETWORK CHANGED'
        this.setState({error: msg})
      }).finally(() => {
        setTimeout(() => {this.setState({redirect:true})},3000)
      })
  }
  closeModal = () => {
    this.setState({
      error: false,
      complete: false 
    },() => this.props.history.push('/'))
  }
  render() {
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
    </> || <CircularProgress/>
  }
}
