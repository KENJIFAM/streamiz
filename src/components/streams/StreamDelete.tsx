import * as React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';
import { Link } from 'react-router-dom';

interface PropsStreamDelete extends RouteComponentProps<MatchParams> {
  fetchStream(id: string): Promise<void>,
  deleteStream(id: string): Promise<void>
}

interface MatchParams {
  id: string
}

interface PropsFromState {
  stream: Stream
}

class StreamDelete extends React.Component<PropsStreamDelete & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderAction() {
    const { id }: MatchParams = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className='ui negative button'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        action={this.renderAction()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: PropsStreamDelete): PropsFromState => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);