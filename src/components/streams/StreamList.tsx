import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';

interface PropsStreamList {
  fetchStreams(): Promise<void>
}

interface PropsFromState {
  streams: Stream[],
  currentUserId: string
}

class StreamList extends React.Component<PropsStreamList & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream: Stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <button className='ui button primary'>Edit</button>
          <button className='ui button negative'>Delete</button>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => (
      <div className='item' key={stream.id}>
        {this.renderAdmin(stream)}
        <i className='large middle aligned icon camera' />
        <div className='content'>
          {stream.title}
          <div className='description'>{stream.description}</div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): PropsFromState => {
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);