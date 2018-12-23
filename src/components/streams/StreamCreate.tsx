import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface PropsStreamCreate extends InjectedFormProps {

}

interface StateStreamCreate {

}

class StreamCreate extends React.Component<PropsStreamCreate, StateStreamCreate> {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit(formValues): void {
    console.log(formValues);
    
  }

  render() {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field name='description' component={this.renderInput} label='Enter Description' />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
}

export default reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate); 