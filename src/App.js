import './App.css';
import MovieList from './components/MovieList';
import React, {useState, useEffect} from 'react';
import {actions} from './features/movieList'
import { useSelector } from 'react-redux';
import NavigationBar from './components/NavigationBar';
import Cart from './components/Cart';
import { Route, HashRouter as Router, Link, Switch } from "react-router-dom";
import Favourite  from './components/Favourite';
import MovieInformation from './components/movieInfo/MovieInformation';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <main>
        <Switch>
          <Route exact path="/cart"> <Cart /> </Route>
          <Route exact path= "/favourites"> <Favourite /> </Route>
          <Route exact path="/"><MovieList /> <TestMovieList /> </Route>
          <Route exact path ="/MovieInformation" component={MovieInformation}/>
        </Switch>
        </main>
        <footer>
          <NavigationBar />
        </footer>
        </div>

     
        
    </Router>
  );
}

const TestMovieList = () => {
  const apiList = useSelector(state => state.movieList.fact);

  if (apiList != null) {
    return (
      <div style={{background: '#f3f3f3'}}>
        {apiList.map((item) => (
          <p>{item.id} {item.name}</p>
        ))}
      </div>
    )
  } else {
    return (
      <div>Ingen laddad lista, vänta.....</div>
    )
  }
};

export default App;
