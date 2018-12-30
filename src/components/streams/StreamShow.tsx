import * as React from 'react';
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
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
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