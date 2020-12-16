import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'


const ModalBar = (props) => {
  return (
  <Snackbar 
    anchorOrigin={{ vertical: 'top', horizontal: props.horizontal || 'right'}}
    open={props.msg}
    autoHideDuration={props.timer ||3000}
    onClose={props.onClose}
  >
    <MuiAlert  variant="filled" severity={props.severity}>
      {props.msg}
    </MuiAlert>
  </Snackbar>
  )
}

export default ModalBar