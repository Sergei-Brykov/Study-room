import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import MainWorkSpase from '../pages/WorkSpase/MainWorkSpase'
import {MainUserManadgment} from '../pages/WorkSpase/AdminManager/MainUserManadgment'
import Settings from '../pages/WorkSpase/Settings.js'
import {GoogleOauth} from '../pages/Oauth/GoogleOauth'
import FacebookOauth from '../pages/Oauth/FacebookOauth'
import {Header} from '../pages/WorkSpase/MainComponents/Header'
import NavBar from '../pages/WorkSpase/MainComponents/NavBar'
import ProfilePage from '../pages/WorkSpase/ProfilePage/MainProfile'

class WorkSpase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isNavBarOpen: false}
    this.openNavBar = this.openNavBar.bind(this)
    this.closeNavBar = this.closeNavBar.bind(this)
  }
  openNavBar() {this.setState({isNavBarOpen: true})}
  closeNavBar() {this.setState({isNavBarOpen: false})}
  render() {
    return (<>
        <Header openNavBar={this.openNavBar}/>
        <NavBar open={this.state.isNavBarOpen} close={this.closeNavBar}/>
        <Switch>
          <Route path='/oauth-redirect-g' component={GoogleOauth}/>
          <Route path='/oauth-redirect-f' component={FacebookOauth}/>  
          <Route exact path='/home' component={MainWorkSpase}/>
          <Route path='/users-management' component={MainUserManadgment}/>
          <Route path='/profile' component={ProfilePage}/>
          <Route path='/settings' component={Settings}/>
          <Redirect to='/home'/>
        </Switch>
      </>    
    )  
  }
}


export default WorkSpase