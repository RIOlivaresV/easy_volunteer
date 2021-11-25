import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login.js";
import Register from "./Components/Register/Register.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import Menu from "./Components/Menu/Menu.js";
import Profile from "./Components/Profile/Profile";
import Logout from "./Components/Logout/Logout";
import Chat from "./Components/Chat/Chat";
import Conversation from "./Components/Conversation/Conversation";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <div>
            <Menu />
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Profile" exact component={Profile} />
            <Route path="/Logout" exact component={Logout} />
            <Route path="/Chat" exact component={Chat} />
            <Route path="/Conversation" exact component={Conversation} />
          </div>
          {/* <Route path="/logout" exact component= {Logout_rol98}/> */}
          {/* <div>
              <Navbar/>
              <Route path="/Resume" exact component= {authent(Profile)}/>
              <Route path="/personalInfo" exact component= {authent(PersonalInfo)}/>
              <Route path="/skills" exact component= {authent(Skill)}/>
              <Route path="/workExperience" exact component= {authent(WorkExperience)}/>
              <Route path="/loading" exact component= {Loading_rol98}/>
            </div> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
