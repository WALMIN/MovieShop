import React, { Component } from 'react'
import MovieInformation from './MovieInformation'
import StarRating from '../starrating/StarRating'; 

class Moviedetail extends Component {
    state ={
        movie_id:""
    };

    componentDidMount(){
        const m_id = this.props.id;
        this.setState({movie_id:m_id});
    }
   
    render() {
        if (this.state.movie_id!="") {
            return (
                <div className="movieDetailContainer" >
                    <MovieInformation movId = {this.state.movie_id}/>
                    <StarRating movId = {this.state.movie_id}/>
                </div>
            )
        }
        else
        {
            return(
                <div>
                    <h1>Invalid Movie ID</h1>
                </div>
            )
        }
        
    }
}

export default Moviedetail
