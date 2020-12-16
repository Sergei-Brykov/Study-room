import React from 'react'
import {CompleteForm} from '../CompleteForm/CompleteForm'
import axiosReq from '../../api/axiosReq'

export const CompleteInvintationPage = (props) => {
  const hash = window.location.pathname.slice(21)
  const checkHash = axiosReq.checkHashInvitation
  const conpleteInvitation = axiosReq.conpleteInvitation
  const msg = <>COMPLETE REGISTRATION <br/> YOUR LOGIN IS:</>
  return <CompleteForm
      checkHash={checkHash}
      conplete={conpleteInvitation}
      signIn={props.signIn}
      hash={hash}
      msg={msg}
    />
}

