import React,{ useState,useEffect, Component } from 'react';
import { FaStar } from 'react-icons/fa';
import "./StarRating.css";
import {db} from '../../firebase';

const colors = {
    orange : "#f8d568",
    grey : "#696969"
};

const ref = db.collection('movieinfo');

function StarRating({movId}) {
    console.log("movieId in starrating:" + this.movId);

    const [posts,setPosts] = useState([]);
    useEffect(() => {
       /* db.collection('sampleId').onSnapshot(snap => {
                setPosts(snap.docs.map(doc=>doc.data()))
        })*/
        ref.where('movieId','==',this.movId).onSnapshot(snap => {
            setPosts(snap.docs.map(doc=>doc.data()))
        })
    }, [])

     const stars = Array(5).fill(0);
     const [currentValue,setCurrentValue] = useState(0);
     const [hoverValue,setHoverValue] = useState(undefined);

     const handleClick = value => {
         setCurrentValue(value)
     };

     const handleMouseOver = value => {
         setHoverValue(value)
     };

     const handleMouseLeave = () => {
         setHoverValue(undefined)
     };

     const saveComments = () =>{
        console.log("Inside saveComments");
       /* db.collection('sampleId').doc("newRating").set({
            movieId:"234",
            movieTitle:"Starwars",
            movieRating:"10",
            movieComments:"Poor"
        })*/
        const newData = {
            movieId:this.movId,
            movieRating: "1",
            movieComments:"Well"
        };
        ref.doc(newData.movieId).set(newData)
        .then(() => {
           console.log("Document successfully written!");
       })
       .catch((error) => {
           console.error("Error writing document: ", error);
       });
    }
     
    return (
        <div className="container">
            <h2> Ratings and Comments </h2>
            {
                posts.map(
                    (vari)=>(
                        <div>
                            <h4>{vari.movieRating}</h4>
                            <h4>{vari.movieComments}</h4>
                        </div>
                    )
                )
            }
            <div className="star"> 
                {stars.map((_,index) => {
                    return(
                        <FaStar className="ratingStar"
                            key={index}
                            color = {(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index+1)}
                            onMouseOver={() => handleMouseOver(index+1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
                
            </div>

            <div className="comments">
                <textarea className="userComments" placeholder="Write Comments" />
                <button className="submitBtn" onClick = {saveComments}>Submit</button>
            </div>
        </div>
    )
}

export default StarRating;