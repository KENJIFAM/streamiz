import * as React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm, { FormData } from './StreamForm';

interface PropsStreamCreate {
  createStream(formValues: FormData): Promise<void>;
}

class StreamCreate extends React.Component<PropsStreamCreate, {}> {
  onSubmit = (formValues: FormData): void => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default connect(undefined, { createStream })(StreamCreate);