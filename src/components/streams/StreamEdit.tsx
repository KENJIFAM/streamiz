import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { fetchStream } from '../../actions';
import { RouteComponentProps } from 'react-router';
import { Stream } from '../../model/Stream';

interface PropsStreamEdit extends RouteComponentProps<MatchParams> {
  fetchStream(id: string): Promise<void>
}

interface MatchParams {
  id: string
}

interface PropsFromState {
  stream: Stream
}

class StreamEdit extends React.Component<PropsStreamEdit & PropsFromState, {}> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    
    return <div>55</div>;
  }
};

const mapStateToProps = (state: AppState, ownProps: PropsStreamEdit): PropsFromState => {  
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream })(StreamEdit);