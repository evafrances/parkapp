import React, { Component } from 'react'
import FormField from '../misc/FormField';
import AuthService from '../../services/AuthService';
import { Redirect } from 'react-router-dom'
import Validations from './Validations'

class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      name: '',
    },
    errors: {},
    touch: {},
    isRegistered: false
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: Validations[name] && Validations[name](value)
      }
    })
  }
  
  handleDate = (date) => {
    this.setState({
      user: {
        ...this.state.user,
        birthDate: date
      }, 
      errors: {...this.state.errors, birthDate: Validations.birthDate && Validations.birthDate(date)}
    });
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }
  getValidationClassName = (attr) => {
    const { errors, touch } = this.state
    if (!touch[attr]){
      return ''
    } else if (errors[attr]){ 
      return 'is-invalid'
    }
    return 'is-valid'
  }

  isValid = () => !Object.keys(this.state.user).some(attr => this.state.errors[attr])

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      AuthService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                email: !errors && message
              }
            })
          }
        )
    }
  }



  render() {
    const { isRegistered, errors, user, touch } =  this.state;
    if (isRegistered) {
      return (<Redirect to="/login" />)
    }


    return (
      <div className="box mx-auto">
        <div className="row">
          <div className="col-6">
            <h3>Sign up</h3>
            <form id="register-form" className="mt-4" onSubmit={this.handleSubmit}>
              <FormField
                label="email"
                name="email"
                onBlur={this.handleBlur}
                value={user.email}
                onChange={this.handleChange}
                touch={touch.email}
                error={errors.email}
                inputType="text"
                validationClassName={this.getValidationClassName('email')} />                            
              <FormField
                label="Name"
                name="name"
                inputType="text"
                value={user.name}
                touch={touch.name}
                error={errors.name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                validationClassName={this.getValidationClassName('name')} /> 
              <FormField
                label="password"
                name="password"
                onBlur={this.handleBlur}
                value={user.password}
                onChange={this.handleChange}
                touch={touch.password}
                error={errors.password}
                inputType="password"
                validationClassName={this.getValidationClassName('password')} /> 
              
            </form>
          </div>
          <div className="col-6 pt-4">
            <button className="btn btn-black" form="register-form" type="submit" disabled={!this.isValid()}> Create the Account</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Register
