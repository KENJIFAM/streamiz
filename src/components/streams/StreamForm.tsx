import * as React from 'react';
import {
  reduxForm,
  Field,
  InjectedFormProps,
  FormErrors,
  WrappedFieldProps,
  WrappedFieldMetaProps
} from 'redux-form';

interface PropsStreamForm {
  onSubmit: (formValues: FormData) => Promise<void>;
}

export interface FormData {
  title: string;
  description: string;
}

interface FieldProps {
  label: string;
}

class StreamForm extends React.Component<InjectedFormProps<FormData> & PropsStreamForm, {}> {
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
    this.props.onSubmit(formValues);
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
};

export default reduxForm<FormData>({
  form: 'streamForm',
  validate
})(StreamForm);