import { Route, Switch } from 'react-router-dom';
import Navigation from './app/components/Navigation';
import EmailAdd from './app/pages/EmailAdd';
import EmailHistory from './app/pages/EmailHistory';
import Home from './app/pages/Home';
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <div className="content">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/new' component={EmailAdd} />
          <Route path='/history' component={EmailHistory} />
        </Switch>
      </div>
    </>
  );
}

export default App;
