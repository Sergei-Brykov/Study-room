import React from 'react'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/styles'

const styles = {
  root: {
    textAlign: 'center',
    color: 'green',
    width: '800px',
    height: '400px',
    background: 'grey'
  }
}

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    const { classes } = this.props
    return <Container component="main" maxWidth="md" className={classes.root}>
        <h1> Settings </h1>
      </Container>
  }
  static getDerivedStateFromProps (p,s) {
    if(s.redirect) p.history.push('/')
    return {}
  }
}
export default withStyles(styles)(Settings)