import * as React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { AppState } from '../reducers';

interface GoogleAuthProps {
  signIn(id: string): void;
  signOut(): void;
}

interface PropsFromState {
  isSignedIn: boolean;
}

interface Auth {
  isSignedIn: {
    get(): boolean,
    listen(done: (isSignedIn: boolean) => void): void
  };
  signIn(): void;
  signOut(): void;
  currentUser: {
    get(): {
      getId(): string
    }
  };
}

class GoogleAuth extends React.Component<GoogleAuthProps & PropsFromState, {}> {
  auth: Auth;

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
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn: boolean): void => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = (): void => {
    this.auth.signIn();
  };

  onSignOutClick = (): void => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return undefined;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={this.onSignOutClick}>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className='ui red google button' onClick={this.onSignInClick}>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state: AppState): PropsFromState => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);