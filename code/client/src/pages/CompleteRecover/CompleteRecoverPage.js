import React from 'react'
import {CompleteForm} from '../CompleteForm/CompleteForm'
import axiosReq from '../../api/axiosReq'

export const CompleteRecoverPage = (props) => {
  const hash = window.location.pathname.slice(18)
  const checkHash = axiosReq.checkHashRecover
  const completeRecover = axiosReq.completeRecover
  const msg = 'RECOVER PASSWORD'
  return <CompleteForm
      checkHash={checkHash}
      conplete={completeRecover}
      signIn={props.signIn}
      hash={hash}
      msg={msg}
    />
}