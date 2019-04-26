import * as React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { Stream } from '../../model/Stream';
import { AppState } from '../../reducers';
import { copyTextToClipboard, resetCopy, formatedDate, timeDifferenceForDate } from '../../utils';
import { User } from '../../model/User';
import { Link } from 'react-router-dom';
const img = require('../../assets/default-avatar.jpg');

interface PropsStreamShow extends RouteComponentProps<MatchProps> {
  fetchStream(id: string): Promise<void>;
}

interface MatchProps {
  id: string;
}

interface PropsFromState {
  stream: Stream;
  currentUser: User;
}

class StreamShow extends React.Component<PropsStreamShow & PropsFromState, {}> {
  videoRef: React.RefObject<HTMLVideoElement>;
  player: flv.Player;

  constructor(props: PropsStreamShow & PropsFromState) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  streamKey = () => {
    return new Date(this.props.stream.createdAt).getTime().toString().slice(1);
  };

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const streamKey = this.streamKey();

    this.player = flv.createPlayer({
      type: 'flv',
      isLive: true,
      url: `/live/${streamKey}.flv`
    }, {
      enableWorker: false,
      lazyLoadMaxDuration: 3 * 60,
      seekType: 'range'
    });

    if (process.env.NODE_ENV === 'production') {
      flv.LoggingControl.enableAll = false;
    }

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  renderAdmin = (userId: string) => {
    if (this.props.currentUser && userId === this.props.currentUser.userId) {
      return (
        <div id='admin-show' className='right floated content'>
          <Link to={`/streams/edit/${this.props.stream._id}`} className='circular ui icon button'>
            <i className='edit icon'></i>
          </Link>
          <Link to={`/streams/delete/${this.props.stream._id}`} className='circular ui icon button'>
            <i className='remove icon'></i>
          </Link>
        </div>
      );
    }
  }

  renderLink = (userId: string) => {
    if (this.props.currentUser && userId === this.props.currentUser.userId) {
      const url = `rtmp://${window.location.hostname}/live/${this.streamKey()}`;
      return (
        <div className='field'>
          <label>Live stream link</label>
          <div className='ui secondary segment'>
            <span
              className='copyBtn'
              data-tooltip='Copy to clipboard'
              data-inverted=''
              onClick={() => copyTextToClipboard(url)}
              onMouseEnter={() => resetCopy()}
            >
              <i className='copy link icon' />
            </span>
            <p className='text'>{url}</p>
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const {
      title,
      description,
      user,
      createdAt,
      views
    } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1 className='streamTitle'>{title}</h1>
        <p className='streamViews'>{`${views ? views : 0} ${views > 1 ? 'views' : 'view'}`}</p>
        <div className='ui divider'></div>
        <div className='ui feed'>
          <div className='event'>
            <div className='label'>
              <img src={user.avatar ? user.avatar : String(img)} />
            </div>
            <div className='content'>
              {this.renderAdmin(user.userId)}
              <div className='summary'>
                {user.name}
              </div>
              <div className='date'>
                <span id='date'><abbr title={formatedDate(createdAt)}>
                  {formatedDate(createdAt, 'short')}
                </abbr></span>
              </div>
              <div className='extra'>
                <form className='ui form'>
                  <div className='field'>
                    <label>Description</label>
                    <p>{description}</p>
                  </div>
                  {this.renderLink(user.userId)}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: PropsStreamShow): PropsFromState => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUser: state.auth.user
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);