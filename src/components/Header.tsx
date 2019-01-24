import * as React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header: React.FunctionComponent = () => {
  return (
    <div className='navbar ui basic segment'>
      <div className='ui secondary pointing menu'>
        <Link to='/' className='item'>
          <img id='navbar-img' src='/favicon.ico' />
          <h2 className='brand'>Streamiz</h2>
        </Link>
        <div className='right menu'>
          <div className='item'>
            <Link to='/' id='all-streams'>
              All streams
            </Link>
          </div>
            <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;