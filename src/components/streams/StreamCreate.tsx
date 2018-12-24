import * as React from 'react';
import { 
  reduxForm, 
  Field, 
  InjectedFormProps, 
  FormErrors, 
  WrappedFieldProps, 
  WrappedFieldMetaProps 
} from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

interface PropsStreamCreate {
  createStream(formValues: FormData): Promise<void>
}

interface FormData {
  title: string,
  description: string
}

interface FieldProps {
  label: string
}

class StreamCreate extends React.Component<InjectedFormProps<FormData> & PropsStreamCreate, {}> {
  renderError({ error, touched }: WrappedFieldMetaProps) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }: WrappedFieldProps & FieldProps) => {
    const className: string = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues: FormData): void => {
    this.props.createStream(formValues);
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

const validate = (formValues: FormData): FormErrors<FormData> => {
  const errors: FormErrors<FormData> = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
}

const formWrapped = reduxForm<FormData>({
  form: 'streamCreate',
  validate
})(StreamCreate);  

export default connect(null, { createStream })(formWrapped);