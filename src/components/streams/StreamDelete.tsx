import * as React from 'react';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {
  const action = (
    <React.Fragment>
      <button className='ui negative button'>Delete</button>
      <button className='ui button'>Cancel</button>
    </React.Fragment>
  );

  return (
    <div>
      StreamDelete
      <Modal
        title='Delete Stream'
        content='Are you sure you want to delete this stream?'
        action={action}
        onDismiss={() => history.push('/')} 
      />
    </div>
  );
};

export default StreamDelete;