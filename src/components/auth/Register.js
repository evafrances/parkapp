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
  // surname: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'surname necesario';
  //   } else if(value.length < 3 || value.length > 30) {
  //       message = 'Mínimo 3 caracteres y máximo 30';
  //   } 
  //       return message;
  // },
  // address: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'address necesario';
  //   } else if(value.length < 3 || value.length > 30) {
  //       message = 'Mínimo 3 caracteres y máximo 30';
  //   } 
  //       return message;
  // },
  // country: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'country necesaria';
  //   }
  //   return message;
  // },
  // city: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'city necesaria';
  //   }
  //   return message;
  // },
  // cp: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'CP necesaria';
  //   }
  //   return message;
  // },
  // cars: (value) => {
  //   let message;
  //   if (!value) {
  //     message = 'cars necesaria';
  //   }
  //   return message;
  // },
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
      // surname: '',
      // address: '',
      // country: '',
      // city: '',
      // cp: '',
      // cars: '',
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
        {/* <Form.Item label="surname">
        <div className={`ant-form-item-control ${errors.surname ? 'has-error' : ''}`}>
          <Input type="surname" name="surname" onChange={this.handleChange} onBlur={this.handleBlur} value={user.surname} placeholder="Introduce surname"/>
            <div className="ant-form-explain">{ errors.surname }</div>
        </div>
        </Form.Item>
        <Form.Item label="address">
        <div className={`ant-form-item-control ${errors.address ? 'has-error' : ''}`}>
          <Input type="address" name="address" onChange={this.handleChange} onBlur={this.handleBlur} value={user.address} placeholder="Introduce address"/>
            <div className="ant-form-explain">{ errors.address }</div>
        </div>
        </Form.Item>
        <Form.Item label="country">
        <div className={`ant-form-item-control ${errors.country ? 'has-error' : ''}`}>
          <Input type="country" name="country" onChange={this.handleChange} onBlur={this.handleBlur} value={user.country} placeholder="Introduce country"/>
            <div className="ant-form-explain">{ errors.country }</div>
        </div>
        </Form.Item>
        <Form.Item label="city">
        <div className={`ant-form-item-control ${errors.city ? 'has-error' : ''}`}>
          <Input type="city" name="city" onChange={this.handleChange} onBlur={this.handleBlur} value={user.city} placeholder="Introduce city"/>
            <div className="ant-form-explain">{ errors.city }</div>
        </div>
        </Form.Item>
        <Form.Item label="cp">
        <div className={`ant-form-item-control ${errors.cp ? 'has-error' : ''}`}>
          <Input type="cp" name="cp" onChange={this.handleChange} onBlur={this.handleBlur} value={user.cp} placeholder="Introduce cp"/>
            <div className="ant-form-explain">{ errors.cp }</div>
        </div>
        </Form.Item> */}
        
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
