import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

interface PropsStreamCreate extends InjectedFormProps {

}

interface StateStreamCreate {

}

class StreamCreate extends React.Component<PropsStreamCreate, StateStreamCreate> {
  renderInput({ input, label }) {
    return (
      <div className='field'>
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  onSubmit(formValues): void {
    console.log(formValues);
    
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
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
  form: 'streamCreate'
})(StreamCreate); 