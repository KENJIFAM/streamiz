import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface PropsModal {
  title: string,
  content: string,
  action: React.ReactNode
}

const Modal: React.FunctionComponent<PropsModal> = (props: PropsModal) => {
  return ReactDOM.createPortal(
    <div  className='ui dimmer modals visible active'>
      <div
        //onClick={e => e.stopPropagation()}
        className='ui standard modal visible active'
      >
        <div className='header'>{props.title}</div>
        <div className='content'>{props.content}</div>
        <div className='actions'>{props.action}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;