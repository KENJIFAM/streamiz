import * as React from 'react';

interface Props {

}

interface State {
  isSignedIn: boolean
}

interface Auth {
  isSignedIn: {
    get(): boolean,
    listen(done: () => void): void
  }
}

class GoogleAuth extends React.Component<Props, State> {
  auth: Auth;
  state: State = {
    isSignedIn: null
  }

  componentDidMount() {
    // @ts-ignore: Property 'gapi' does not exist on type 'Window'
    window.gapi.load('client:auth2', () => {
      // @ts-ignore: Property 'gapi' does not exist on type 'Window'
      window.gapi.client.init({
        clientId: '537222515934-dvrvlq1ip9tf2morkvr878aavbr8t3hl.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // @ts-ignore: Property 'gapi' does not exist on type 'Window'
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({
          isSignedIn: this.auth.isSignedIn.get()
        });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  };

  onAuthChange = () => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get()
    });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>Null</div>
    } else if (this.state.isSignedIn) {
      return <div>Signed in</div>;
    } else {
      return <div>Not signed in</div>;
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  };
};

export default GoogleAuth;