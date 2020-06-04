import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    await loginUser({ email, password });
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
          <div className='card-header mb-3 h3 text-center'>Login</div>
          <div>
            <form onSubmit={(e) => this.onSubmit(e)} method='post'>
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

export default connect(mapStateToProps, null)(Login);
