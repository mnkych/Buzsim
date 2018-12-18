import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Splash from './containers/Splash'
import Instruction from './containers/Instruction'
import Manage from './containers/Manage'
import Report from './containers/Report'
import Create from './containers/Create'
import Delete from './containers/Delete'
import AdminManagement from './containers/ManageByInstructor'
import AdminClassRoomManagement from './containers/ManageClassByInstructor'

const scrollToTop = () => {
  window.scrollTo(0, 0)
  return null
}
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={scrollToTop} />
          <Route exact path='/' component={Splash} />
          <Route exact path='/Instruction' component={Instruction} />
          <Route exact path='/Management' component={AdminManagement} />
          <Route exact path='/Management/Classroom' component={AdminClassRoomManagement} />
          <Route exact path='/Management/Scenario/CreateScenario' component={Create} />
          <Route exact path='/Management/Scenario/DeleteScenario' component={Delete} />          
          <Route path='/Manage/:level' render={(props) => <Manage {...props} />} />
          <Route exact path='/Manage' render={(props) => <Manage  {...props} />} />
          <Route exact path='/Report' render={(props) => <Report {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App;
