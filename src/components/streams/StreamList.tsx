import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';
import { Link } from 'react-router-dom';
import { timeDifferenceForDate } from '../../utils';
import { User } from '../../model/User';

interface PropsStreamList {
  fetchStreams(): Promise<void>;
}

interface PropsFromState {
  streams: Stream[];
  currentUser: User;
  isSignedIn: boolean;
}

class StreamList extends React.Component<PropsStreamList & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream: Stream) {
    if (this.props.currentUser && stream.user.userId === this.props.currentUser.userId) {
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
          <Link to={`/streams/${stream._id}`} className='ui small header'><span>{stream.title}</span></Link>
          <div className='description'>{stream.description}</div>
          <div className='extra'>
            <span>
              {`${stream.views ? stream.views : 0} ${stream.views > 1 ? 'views' : 'view'}`}
            </span>
            <span>
              {`${timeDifferenceForDate(stream.createdAt)} (last seen ${timeDifferenceForDate(stream.updatedAt)})`}
            </span>
          </div>
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
    console.log(this.props.currentUser);

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
    currentUser: state.auth.user,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);