import './App.css';
import MovieList from './components/MovieList';
import { useSelector } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import Jumbotron from './components/Jumbotron';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Favourite  from './components/Favourite';
import MovieInfo from './components/movieInfo/Moviedetail';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <main>
        <Switch>
          <Route exact path="/">
            <Jumbotron />
            <div className="movie-list-container" style={{position: "absolute", top: "65vh"}}>
              <MovieList />
            </div>
          </Route>
          <Route exact path="/cart"> <Cart /> </Route>
          <Route exact path="/payment"> <Payment /> </Route>
          <Route exact path="/confirmation"> <Confirmation /> </Route>
          <Route exact path= "/favourites"> <Favourite /> </Route>
          <Route exact path="/MovieInfo/:id" render={(props) => (
                      <MovieInfo id={props.match.params.id}/>)}></Route>
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
