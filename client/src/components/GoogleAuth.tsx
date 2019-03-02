import * as React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { AppState } from '../reducers';
import { User } from '../model/User';
const img = require('../assets/default-avatar.jpg');

interface GoogleAuthProps {
  signIn(user: User): void;
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
      getId(): string,
      getBasicProfile(): any
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
        clientId: process.env.GOOGLE_CLIENTID,
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
      const user = {
        userId: this.auth.currentUser.get().getId(),
        name: this.auth.currentUser.get().getBasicProfile().getName(),
        avatar: this.auth.currentUser.get().getBasicProfile().getImageUrl()
      } as User;
      this.props.signIn(user);
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
      const avatar = this.props.isSignedIn ? this.auth.currentUser.get().getBasicProfile().getImageUrl() : undefined;
      const name = this.auth.currentUser.get().getBasicProfile().getName();
      return (
        <div id='navbar-avatar' className='ui secondary menu'>
          <div id='navbar-avatar-dropdown' className='ui simple dropdown item'>
            <img src={avatar ? avatar : String(img)} />
            <i className='dropdown icon'></i>
            <div className='menu'>
              <div className='item'>
                <img src={avatar ? avatar : String(img)} />
                <span id='navbar-avatar-name'>{name}</span>
              </div>
              <div className='ui divider'></div>
              <div className='item'>
                <button className='ui google plus button' onClick={this.onSignOutClick}>
                  <i className='google icon' />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <button className='ui google plus button' onClick={this.onSignInClick}>
          <i className='google icon' />
          <span>Login with Google</span>
        </button>
      );
    }
  }

  render() {
    return (
      <div className='item'>
        <div>
          {this.renderAuthButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): PropsFromState => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);