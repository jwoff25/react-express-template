import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <a className='navbar-brand' href='/'>
            ONGAK
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            {this.props.isAuthenticated ? (
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <button
                    className='btn btn-outline-light'
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <a className='nav-link' href='/login'>
                    Login <span className='sr-only'>(current)</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/register'>
                    Sign Up
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Navbar);
