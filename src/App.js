import './App.css';
import MovieList from './components/MovieList';
import React, {useState, useEffect} from 'react';
import {actions} from './features/movieList'
import { useSelector } from 'react-redux';
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
          <Route exact path="/"><MovieList /> <TestMovieList /> </Route>
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

  if(apiList === null) {
    return (
      <div>Ingen laddad lista, vänta.....</div>
    )
  } else {
    return (
      <div style={{background: '#f3f3f3'}}>
        {apiList.map((item) => (
          <p>{item.id} {item.name}</p>
        ))}
      </div>
    )

  }
};

export default App;
