import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanelFile from './TabPanelFile'
class MainFileSpace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: 0}
    this.changeTable = this.changeTable.bind(this)
  }
  changeTable () {this.setState({value: this.state.value === 0 ? 1 : 0})}
  render() {
    return (<>
        <Tabs 
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example" 
          value={this.state.value}
          onChange={this.changeTable}
        >
          <Tab label={'Files'}/>
          <Tab label={'Info'}/>
        </Tabs>
        <TabPanelFile value={this.state.value} index={0}>
          Files
        </TabPanelFile>
        <TabPanelFile value={this.state.value} index={1}>
          Info
        </TabPanelFile>
      </>
    )
  }
}
export default MainFileSpace