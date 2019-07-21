import React from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/AuthService';
import {withAuthContext} from '../../contexts/AuthStore';
import { Link } from 'react-router-dom'
import './auth.css';


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

class Profile extends React.Component {
  state={
    user: {
      username:'',
      // surname: '',
      email: '',
      address: '',
      country: '',
      city: '',
      // !  <3
    },
    errors: {},
    isLogged: false,
    isEdit: true
  }

  handleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
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
          authService.editProfile(this.state.user)
            .then(
              (user) => {
                this.handleEdit()
                // this.setState({user: user.data})
                this.props.onUserChange(user.data)
              },
              (error) => {
                debugger
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

  componentDidMount(){
    const {user} = this.props //viene del context
    // console.log(user)
    user && this.setState({
      ...this.state,
      user: {
        username: user.name,
        // surname: user.surname,
        email: user.email,
        address: user.address,
        country: user.country,
        city: user.city,
      }
    })
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
    // console.log(this.state)
    const { user, errors, isLogged, isEdit }  = this.state;
    // if(this.props.isAuthenticated()) {
    //   return <Redirect to={`/`}/>
    // }
    // console.log(user)

    return (
      <div>
      <Form onSubmit={this.handleSubmit} className="Profile-form">
        <Form.Item>
        <p>Name</p>
          <div className={`ant-form-item-control ${errors.username ? 'has-error' : ''}`}>
            <Input
            disabled={isEdit}
              type="text" name="username" onChange={this.handleChange} value={user.username}
              />
            <div className="ant-form-explain">{ errors.username }</div>
          </div>
        </Form.Item>
        <Form.Item>
        <p>Address</p>
        <div className={`ant-form-item-control ${errors.address ? 'has-error' : ''}`}>
          <Input
          disabled={isEdit}
              type="address" name="address" onChange={this.handleChange} value={user.address}
            />
          <div className="ant-form-explain">{ errors.address }</div>
        </div>
        </Form.Item>
        <Form.Item>
        <p>Country</p>
        <div className={`ant-form-item-control ${errors.country ? 'has-error' : ''}`}>
          <Input
          disabled={isEdit}
              type="country" name="country" onChange={this.handleChange} value={user.country}
            />
          <div className="ant-form-explain">{ errors.country }</div>
        </div>
        </Form.Item>
        <Form.Item>
        <p>City</p>
        <div className={`ant-form-item-control ${errors.city ? 'has-error' : ''}`}>
          <Input
          disabled={isEdit}
              type="city" name="city" onChange={this.handleChange} value={user.city}
            />
          <div className="ant-form-explain">{ errors.city }</div>
        </div>
        </Form.Item>
        <Form.Item>
        <Button type="primary" disabled={!this.isValid()} onClick = {this.handleEdit}>
            Edit
          </Button>
          <Button type="primary" disabled={!this.isValid()} htmlType="submit">
            Save
          </Button>
          </Form.Item>
          <Link to={`/`}><Icon className="arrow-right" type="arrow-right" /></Link>
      </Form>
      </div>
    );
    
  }
}


export default withAuthContext(Profile);


