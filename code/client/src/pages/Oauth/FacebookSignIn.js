import React from 'react'
import {CircularProgress} from '@material-ui/core'
import axiosReq from '../../api/axiosReq'
export class FacebookSignIn extends React.Component {
  constructor(props) {
    super(props)
    this.oAuth()
  }
  async oAuth() {
    let code = window.location.search.slice(1).split('&')[0].slice(5)
    const data = {code}
    axiosReq.facebookSignIn(data) 
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('oauthId', res.data.oauthId)
        // window.location.reload()
        // костыль номер 2
        this.props.signIn()  
      }).catch((error) => {
        this.setState({message: error.response.data.message})
      }) 
  }
  render() {
    return <CircularProgress />
  }
}