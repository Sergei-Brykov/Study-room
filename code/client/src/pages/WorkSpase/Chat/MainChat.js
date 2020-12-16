
import {parseJwt} from '../../../util/parseJwt'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'
import { Button } from '@material-ui/core'
import s from './MainChat.module.css'
class MainChat extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: parseJwt(localStorage.getItem('token')),
      message: [
        {
          ownerName: "yo",
          ownerEmail: 'serg1990devit@gmail.com',
          message: 'ypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyp yoyoys oh,sfdsf dypyoypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyoys oh,sfdsf d',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "",
          ownerEmail: 'serg1990devit@gmail.com',
          message: 'ypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyp yoyoys oh,sfdsf dypyoypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyoys oh,sfdsf d',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "",
          ownerEmail: 'sergbrikov@gmail.com',
          message: 'ypyoyoyoh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "yo1",
          ownerEmail: 'serg1990devit@gmail.com',
          message: 'ypyoyoy sdas sd  sd sd sd asdas oh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "",
          ownerEmail: 'sergbrikov@gmail.com',
          message: 'ypyoyo asd sad sd asd asd asd asd asdsad as asd as yoh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "",
          ownerEmail: 'serg1990devit@gmail.com',
          message: 'ypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyp yoyoys oh,sfdsf dypyoypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dypyoyoys oh,sfdsf dyoys oh,sfdsf d',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "",
          ownerEmail: 'sergbrikov@gmail.com',
          message: 'ypyoyoyoh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "yo1",
          ownerEmail: 'serg1990devit@gmail.com',
          message: 'ypyoyoy sdas sd  sd sd sd asdas oh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }, {
          ownerName: "Serg",
          ownerEmail: 'sergbrikov@gmail.com',
          message: 'ypyoyo asd sad sd asd asd asd asd asdsad as asd as yoh,sd',
          time: '2020-12-15T02:31:31.155Z',
          market: false
        }
      ]
    }
    this.div = React.createRef()
    this.webSoket= this.webSoket.bind(this)

    window.socket.on('update', (data) => {
      console.log(data)
    })
  }
  componentDidMount() {
    this.div.current.scrollTop = this.div.current.scrollHeight
  }

  webSoket(e) {
    e.preventDefault()
    const socket = window.socket
    socket.emit('msg', e.target[0].value)

    

    e.target[0].value = ''
  }


  render() {
    const msgs = this.state.message
    const messageList = msgs.map((msg) => {
      let alignPosition, flexDirection, myClass
      if(msg.ownerEmail === this.state.user.email) {
        alignPosition = 'right'
        flexDirection = 'row-reverse'
        myClass = 'my-msg'
      } else {
        alignPosition = 'left'
        flexDirection = 'row'
      }

      return (<ListItem 
        key={msg.time} 
        className={[s.msgContainer, s[myClass]]}
      >
        <Grid 
          container 
          xs={12}
        >
          <Grid 
            container 
            item 
            xs={12} 
            direction={flexDirection} 
            justify={'flex-start'} 
            alignItems='center'
          >
            <Grid item>
              <span  align='left' className={s.owner}> {msg.ownerName || msg.ownerEmail}  </span>
            </Grid>
            <Grid item>
              <Button 
                className={s.chatbtn} 
                size='small' 
              >
                DELETE
              </Button>
            </Grid>
            <Grid item>
              <Button 
                className={s.chatbtn}  
                size='small' 
              >
                ANCHOR
                </Button>
            </Grid>
          </Grid>
          <ListItemText 
            className={s.message} align={alignPosition} 
            primary={msg.message} secondary={msg.time.slice(11, 16)}
          />
        </Grid>
      </ListItem>)
    })
    return (<>
      <List className={s.messageArea} ref={this.div}>
        {messageList}
      </List>
      <Divider className={s.inputMsg}/>
      <form onSubmit={this.webSoket}>
      <Grid container style={{padding: '20px'}}>
          <Grid item xs={11}>
            <TextField  
              name='msg'
              label="Type Something" fullWidth />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon />
            </Fab>
          </Grid>
      </Grid>
      </form>
    </>)
  }
}
export default MainChat