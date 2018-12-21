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
  },
  signIn(): void,
  signOut(): void
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

  onAuthChange = (): void => {
    this.setState({
      isSignedIn: this.auth.isSignedIn.get()
    });
  };

  onSignIn = (): void => {
    this.auth.signIn();
  };

  onSignOut = (): void => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOut}>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className='ui red google button' onClick={this.onSignIn}>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  };
};

export default GoogleAuth;