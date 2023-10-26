import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
 constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
 }

 handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { name, email, password, role } = this.state;
    const user = { name, email, password, role };
    if (name && email && password && role) {
      axios.post('/api/users', user)
        .then(res => {
          console.log(res.data);
          this.props.history.push('/users');
        })
        .catch(err => console.log(err));
    }
 }

 render() {
    const { name, email, password, role, submitted } = this.state;
    return (
      <div className="container">
        <h2>Create User</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
            {submitted && !name && <div className="help-block">Name is required</div>}
          </div>
          <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email && <div className="help-block">Email is required</div>}
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password && <div className="help-block">Password is required</div>}
          </div>
          <div className={'form-group' + (submitted && !role ? ' has-error' : '')}>
            <label htmlFor="role">Role</label>
            <input type="text" className="form-control" name="role" value={role} onChange={this.handleChange} />
            {submitted && !role && <div className="help-block">Role is required</div>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    );
 }
}

export default CreateUser;