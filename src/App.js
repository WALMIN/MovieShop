import './App.css';
import MovieList from './components/MovieList';
import React, {useState, useEffect} from 'react';
import {actions} from './features/movieList'
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Shop</h1>
      </header>

      <main>
        <MovieList />
        <TestMovieList />
      </main>
    </div>
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
