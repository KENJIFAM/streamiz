import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';
import Footer from './Footer';

const App: React.FunctionComponent = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <div id='app'>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/new' exact component={StreamCreate} />
            <Route path='/streams/edit/:id' exact component={StreamEdit} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/:id' exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;