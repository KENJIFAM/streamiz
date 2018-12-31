import * as React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { Stream } from '../../model/Stream';
import { AppState } from '../../reducers';

interface PropsStreamShow extends RouteComponentProps<MatchProps> {
  fetchStream(id: string): Promise<void>
}

interface MatchProps {
  id: string
}

interface PropsFromState {
  stream: Stream
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

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id }: MatchProps = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
};

const mapStateToProps = (state: AppState, ownProps: PropsStreamShow): PropsFromState => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);