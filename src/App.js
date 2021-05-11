import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Varukorg from './components/Varukorg';
import { Route, HashRouter as Router, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <main>
        <Switch>
          <Route exact path="/cart"> <Varukorg /> </Route>
        </Switch>
        </main>
        <footer>
          <NavigationBar />
        </footer>
      </div>
    </Router>
  );
}

export default App;
