import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Button
} from 'antd';

import AuthService from '../../services/AuthService';


const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email necesario';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Ups! Parece que este email no existe';
    }
    return message;
  },
  name: (value) => {
    let message;
    if (!value) {
      message = 'name necesario';
    } else if(value.length < 3 || value.length > 30) {
        message = 'Mínimo 3 caracteres y máximo 30';
    } 
        return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password necesaria';
    }
    return message;
  }
  
} 
class Register extends React.Component {
  state = {
    user: {
      email: '',
      name: '',
      password: ''
    },
    errors: {},
    touch: {},
    isRegistered: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      AuthService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
          (error) => {
            const { message, errors } = error.response.data;
              var nameField = '';
                if (message === 'Email is already registered') {
                  nameField = 'email';
                } else {
                  nameField = 'name';
                }
                  if(message && !errors) {
                    this.setState({
                      errors: {
                        ...this.state.errors,
                        ...errors,
                        [nameField]: message
                      }
                    })
                  } else {
                    this.setState({
                      errors: {
                      ...this.state.errors,
                      ...errors,
                      }
                    })
                  }
          }
        )
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name] : value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
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

  // isEmpty = (obj) => {
  //   for(var key in obj) {
  //       if(obj.hasOwnProperty(key))
  //           return false;
  //   }
  //   return true;
  // }

  isValid = () => {
    // if(this.isEmpty(this.state.errors)) {
    //   return false;
    // } else {
        return !Object.keys(this.state.user)
          .some(attr => this.state.errors[attr])
    }
  // }

  render() {
    console.log(this.state)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    
    const { user, errors, isRegistered } =  this.state;
    if (isRegistered) {
      return <Redirect to="/login" />
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} >
        <Form.Item label="E-mail">
        <div className={`ant-form-item-control ${errors.email ? 'has-error' : ''}`}>
          <Input 
            type="email" name="email" onChange={this.handleChange} value={user.email} 
            placeholder="Introduce Email"
          />
          <div className="ant-form-explain">{ errors.email }</div>
        </div>
        </Form.Item>
        <Form.Item label="name">
        <div className={`ant-form-item-control ${errors.name ? 'has-error' : ''}`}>
          <Input type="text" name="name" onChange={this.handleChange} onBlur={this.handleBlur}value={user.name} placeholder="Elige un name"/>
            <div className="ant-form-explain">{ errors.name }</div>
        </div>
        </Form.Item>
        <Form.Item label="Password">
        <div className={`ant-form-item-control ${errors.password ? 'has-error' : ''}`}>
          <Input type="password" name="password" onChange={this.handleChange} onBlur={this.handleBlur} value={user.password} placeholder="Introduce Password"/>
            <div className="ant-form-explain">{ errors.password }</div>
        </div>
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          <Button type="primary" disabled={!this.isValid()} htmlType="submit">
            Resgístrame
          </Button>
        </Form.Item>
      
      </Form>
    )
  }

}
  
export default Register;
