import React, { Component } from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import AuthRouter from './route/AuthRouter'
import WorkSpase from './route/WorkSpase'
import theme from './style/theme'
import {ThemeProvider} from '@material-ui/core/styles';


// import ReactDOM from 'react-dom'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: localStorage.getItem('token')
    }
    this.cangeAuth = this.cangeAuth.bind(this) 
  }
  cangeAuth() {
    this.setState({isAuth: localStorage.getItem('token')})
  }
  render() {
    const application = this.state.isAuth ? 
      <WorkSpase logOut={this.cangeAuth}/> 
    : <AuthRouter signIn={this.cangeAuth}/>
    return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {application} 
    </BrowserRouter>
    </ThemeProvider>
    )
  }
}









export default App
