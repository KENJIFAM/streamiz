import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { AppState } from '../../reducers';
import { Stream } from '../../model/Stream';

interface PropsStreamList {
  fetchStreams(): Promise<void>,
  streams: Stream[]
}

class StreamList extends React.Component<PropsStreamList, {}> {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList() {
    return this.props.streams.map(stream => (
      <div className='item' key={stream.id}>
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

const mapStateToProps = (state: AppState): { streams: Stream[]} => {
  return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);