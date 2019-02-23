import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { fetchStream, editStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { Stream } from '../../model/Stream';
import StreamForm, { FormData } from './StreamForm';

interface PropsStreamEdit extends RouteComponentProps<MatchParams> {
  fetchStream(id: string): Promise<void>;
  editStream(is: string, formValues: FormData): Promise<void>;
}

interface MatchParams {
  id: string;
}

interface PropsFromState {
  stream: Stream;
}

class StreamEdit extends React.Component<PropsStreamEdit & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues: FormData): void => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          initialValues={{ title: this.props.stream.title, description: this.props.stream.description }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: PropsStreamEdit): PropsFromState => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);