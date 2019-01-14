import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';
import { Link } from 'react-router-dom';

interface PropsStreamList {
  fetchStreams(): Promise<void>;
}

interface PropsFromState {
  streams: Stream[];
  currentUserId: string;
  isSignedIn: boolean;
}

class StreamList extends React.Component<PropsStreamList & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream: Stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream._id}`} className='ui button primary'>Edit</Link>
          <Link to={`/streams/delete/${stream._id}`} className='ui button negative'>Delete</Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => (
      <div className='item' key={stream._id}>
        {this.renderAdmin(stream)}
        <i className='large middle aligned icon camera' />
        <div className='content'>
          <Link to={`/streams/${stream._id}`} className='header'>{stream.title}</Link>
          <div className='description'>{stream.description}</div>
        </div>
      </div>
    ));
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div>
          <Link to='/streams/new' className='ui right floated button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): PropsFromState => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);