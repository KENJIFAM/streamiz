import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';
import { Link } from 'react-router-dom';
import { timeDifferenceForDate } from '../../utils';
import { User } from '../../model/User';
const img = require('../../assets/default-avatar.jpg');

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
        <div id='admin' className='right floated content'>
          <Link to={`/streams/edit/${stream._id}`} className='circular ui icon button'>
            <i className='edit icon'></i>
          </Link>
          <Link to={`/streams/delete/${stream._id}`} className='circular ui icon button'>
            <i className='remove icon'></i>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => (
      <div className='item' key={stream._id}>
        {this.renderAdmin(stream)}
        <div className='image'>
          <img src={stream.user.avatar ? stream.user.avatar : String(img)} />
        </div>
        <div className='content'>
          <div className='ui small header'>
            <Link to={`/streams/${stream._id}`}><span>{stream.title}</span></Link>
          </div>
          <div className='meta'>{stream.user.name}</div>
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
          <Link to='/streams/new' className='circular ui icon right floated button primary'>
            <i className='plus icon'></i>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderCreate()}
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
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