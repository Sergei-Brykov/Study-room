import React from 'react'
import { withStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'

const styles = {
  root: {
    textAlign: 'center',
    color: 'green',
    width: '100%',
    height: 'calc(50vh - 64px)',
    background: 'grey'
  }
}
class MainVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { classes } = this.props
    return <Box className={classes.root}>
        <h1> VideoComponent </h1>
      </Box>
  }
}
export default withStyles(styles)(MainVideo)