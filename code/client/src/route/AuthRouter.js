import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'

import AuthPage from '../pages/AuthPage/AuthPage'
import {FogotPasswordPage} from '../pages/FogotPasswordPage/FogotPasswordPage'
import {CompleteInvintationPage} from '../pages/CompleteInvintationPage/CompleteInvintationPage'
import {CompleteRecoverPage} from '../pages/CompleteRecover/CompleteRecoverPage'
import {FacebookSignIn} from '../pages/Oauth/FacebookSignIn'
import {GoogleSignIn} from '../pages/Oauth/GoogleSignIn'

const AuthRouter = (props) => {
  return (
    <Switch>
      <Route 
        path='/oauth-google-login' 
        render={() => <GoogleSignIn signIn={props.signIn}/>}
      />
      <Route 
        path='/oauth-facebook-login' 
        render={() => <FacebookSignIn signIn={props.signIn}/>}
      />
      <Route 
        path="/login" 
        render={() => <AuthPage signIn={props.signIn}/>}
      />
      <Route 
        path="/complete-invitation/*" 
        render={() => <CompleteInvintationPage signIn={props.signIn}/>}
      /> 
      <Route 
        path="/complete-recover/*"
        render={() => <CompleteRecoverPage signIn={props.signIn}/>}
      />
      <Route path="/forgot-password*" component={FogotPasswordPage}/>
      <Redirect to='/login'/>
    </Switch>
  )

  
  
}

export default AuthRouter
