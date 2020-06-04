import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";
import { ToastContainer } from "react-toastify";
import Alert from "./components/Alert";

if (sessionStorage.getItem("token")) {
  setAuthToken(sessionStorage.getItem("token"));
}

export class App extends Component {
  componentDidMount() {
    loadUser();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
          <Alert />
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
