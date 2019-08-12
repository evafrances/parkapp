import React from 'react';
import ParkingService from '../../services/ParkingService'
import { Redirect } from 'react-router-dom'
import FormField from '../misc/FormField';

const validators = {
  title: value => value.length > 3,
}

class FavForm extends React.Component {
  state = {
    data: {
      title: ''
    },
    errors: {
      title: true
    },
    goToFav: false,
    touch: {}
  }
//corre cada vez que una tecla es oprimida para actualizar el estado de React
  handleChange = (event) => {
    const { name, value } = event.target
    const isValid = validators[name](value)

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !isValid
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target

    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  getValidationClassName = (attr) => {
    const { errors, touch } = this.state

    if (!touch[attr]) {
      return ''
    } else if (errors[attr]) {
      return 'is-invalid'
    } else {
      return 'is-valid'
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    ParkingService.getParkings(this.state.data).then(
      () => {        
        this.setState({ goToFav: true })
      },
      error => {
        // Advanced way to show server errors in the form!

        const serverErrors = Object.keys(error.response.data.errors).reduce((acc, el) => (
          { ...acc, [el]: true }
        ), {})

        this.setState({
          errors: {
            ...this.state.errors,
            ...serverErrors
          }
        })
      }
    )
  }

  render () {
    if (this.state.goToFav) {
      return <Redirect to="/"/>
    }

    const { data, errors, touch } = this.state

    const hasErrors = Object.values(errors).some(el => el === true)

    return (
      <article className="favForm">

        <form onSubmit={this.handleSubmit}>
          <FormField
            label="Title"
            name="title"
            onBlur={this.handleBlur}
            value={data.title}
            onChange={this.handleChange}
            touch={touch.title}
            error={errors.title}
            inputType="text"
            validationClassName={this.getValidationClassName('title')} />
        
          <button type="submit"
            className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
            disabled={hasErrors}>Save</button>
        </form>
      </article>
    )
  }
}

export default FavForm