import * as React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { Stream } from '../../model/Stream';
import { AppState } from '../../reducers';
import { copyTextToClipboard, resetCopy } from '../../utils';

interface PropsStreamShow extends RouteComponentProps<MatchProps> {
  fetchStream(id: string): Promise<void>;
}

interface MatchProps {
  id: string;
}

interface PropsFromState {
  stream: Stream;
  currentUserId: string;
}

class StreamShow extends React.Component<PropsStreamShow & PropsFromState, {}> {
  videoRef: React.RefObject<HTMLVideoElement>;
  player: flv.Player;
  RTMP_SERVER: string;

  constructor(props: PropsStreamShow & PropsFromState) {
    super(props);
    this.videoRef = React.createRef();
    this.RTMP_SERVER = process.env.RTMP_SERVER || 'localhost';
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
    const url = process.env.HTTPS
      ? `https://${this.RTMP_SERVER}:8443/live/${streamKey}.flv`
      : `http://${this.RTMP_SERVER}:8000/live/${streamKey}.flv`;

    this.player = flv.createPlayer({
      type: 'flv',
      isLive: true,
      url
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
    if (userId === this.props.currentUserId) {
      const url = `rtmp://${this.RTMP_SERVER}/live/${this.streamKey()}`;
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

    const { title, description, userId } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <form className='ui form'>
          <div className='field'>
            <label>Description</label>
            <p>{description}</p>
          </div>
          {this.renderAdmin(userId)}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: PropsStreamShow): PropsFromState => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);