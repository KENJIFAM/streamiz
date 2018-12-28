import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Modal: React.FunctionComponent = props => {
  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>
      <div className='ui standard modal visible active'>
        aaaaaaaa
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;