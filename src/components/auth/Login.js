import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import authService from '../../services/AuthService';
import { AuthContext } from '../../contexts/AuthStore';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const validations = {
  username: (value) => {
    let message;
    if (!value) {
      message = 'Username necesario';
    }
    return message;
  },
  password: (value) => {
    let message;
    if(!value) {
      message = 'Password necesaria';
    }
    return message;
  }
} 

class Login extends React.Component {

  state={
    user: {
      username:'',
      password:'',
      id:''
    },
    errors: {},
    isLogged: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isEmpty(this.state.errors)) {
      this.setState({
        errors: {
          username: 'Username necesario',
          password: 'Password necesaria'
        }
      })
    } else if(this.state.user.username === ''){
        this.setState({
          errors: {
            ...this.state.errors,
            username: 'Username necesario'
          }
        })
    } else if(this.state.user.password === ''){
      this.setState({
        errors: {
          ...this.state.errors,
          password: 'Password necesaria'
        }
      })
  } else {
        if(this.isValid()) {
          authService.authenticate(this.state.user)
            .then(
              (user) => {
                console.log(user + 'hola')
                this.setState({ 
                  user: {
                    ...this.state.user,
                    ...user,
                    id: user.id
                  },
                  isLogged:true
                })
              },
              (error) => {
                const { message, errors } = error.response.data;
                this.setState({
                  errors: {
                    ...this.state.errors,
                    ...errors,
                    password: !errors && message
                  }
                })
              }
            )
        }
      }
    }

  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
      }
      return true;
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
    }

  render() {
    console.log(this.state)
    const { user, errors, isLogged }  = this.state;
    if(isLogged) {
      return <Redirect to={`/user/${user.id}`}/>
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          <div className={`ant-form-item-control ${errors.username ? 'has-error' : ''}`}>
            <Input
              type="text" name="username" onChange={this.handleChange} value={user.username} 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              />
            <div className="ant-form-explain">{ errors.username }</div>
          </div>
        </Form.Item>
        <Form.Item>
        <div className={`ant-form-item-control ${errors.password ? 'has-error' : ''}`}>
          <Input
              type="password" name="password" onChange={this.handleChange} value={user.password} 
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
            />
          <div className="ant-form-explain">{ errors.password }</div>
        </div>
        </Form.Item>
        <Form.Item>
        <Checkbox>Recuérdame</Checkbox>
          <Button type="primary" htmlType="submit" className="login-form-button" style={ {display:'flex',margin:'auto'} }>
            Log in
          </Button>
          ¿Todavía sin cuenta? <Link to="/register">regístrate ahora!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const LoginWithAuthContext = (loginProps) => {
  return (
    <AuthContext.Consumer>
      {(consumerProps) => (<Login {...consumerProps} {...loginProps} />)}
    </AuthContext.Consumer>
  );
}

export default LoginWithAuthContext;
