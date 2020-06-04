import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formCompleted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      await registerUser({ username, email, password, confirmPassword });
      if (this.props.isAuthenticated) {
        // change to dashboard
        this.props.history.push("/dashboard");
      }
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        className='bg-secondary'
      >
        <div className='card shadow-lg p-3 mb-5 bg-white rounded col-sm-4'>
          <div className='card-header mb-3 h3 text-center'>Register</div>
          <div>
            <form onSubmit={(e) => this.onSubmit(e)} method='post'>
              <div className='form-group'>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  value={this.state.username}
                  className='form-control'
                  id='username'
                  onChange={(e) => this.onChange(e)}
                  required={true}
                />
              </div>
              <div className='form-group'>
                <label>Email address</label>
                <input
                  type='email'
                  name='email'
                  value={this.state.email}
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={(e) => this.onChange(e)}
                  required={true}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  value={this.state.password}
                  className='form-control'
                  id='exampleInputPassword1'
                  onChange={(e) => this.onChange(e)}
                  required={true}
                  minLength='8'
                />
                <small id='passwordHelp' className='form-text text-muted'>
                  Must be at least 8 characters long.
                </small>
              </div>
              <div className='form-group'>
                <label>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  className='form-control'
                  id='exampleInputPassword2'
                  onChange={(e) => this.onChange(e)}
                  required={true}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Register);
