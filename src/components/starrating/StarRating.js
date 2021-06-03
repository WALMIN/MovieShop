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
    const mId = movId;
    console.log("movieId in starrating:" + mId);

    const [posts,setPosts] = useState([]);
    const [userComment, setUserComment] = useState("");
    
    useEffect(() => {
        
        ref.where('movieId','==',mId).onSnapshot(snap => {
            var postsLists = [];
            snap.forEach((doc) => {
                const data = doc.data();
                postsLists.push(data);
                setPosts(postsLists);
            });
            console.log("Got from firestore:" + postsLists);
            //setPosts(snap.docs.map(doc=>doc.data()))
            //setPosts(commentsList);
           console.log("setPosts value:"+ setPosts.value);
        })
    }, [])

    

     const stars = Array(5).fill(0);
     const [currentValue,setCurrentValue] = useState(0);
     const [hoverValue,setHoverValue] = useState(undefined);

     const handleClick = value => {
         setCurrentValue(value);
     };

     const handleMouseOver = value => {
         setHoverValue(value)
     };

     const handleMouseLeave = () => {
         setHoverValue(undefined)
     };

     const saveComments = () =>{
        //event.preventDefault();
        //setPosts(event);
        console.log("User comments submitted:" + userComment);
        console.log("star value" + currentValue);

        const newData = {
            movieId: mId,
            movieRating: +currentValue,
            movieComments: userComment
        };
        //Add new ratings & comments to firebase
        ref.add(newData)
        .then(() => {
            alert('Added ratings & Comments successfully');
           console.log("Document successfully written!");
           
       })
       .catch((error) => {
           console.error("Error writing document: ", error);
       });
    };

    const handleBlur = event => {
        console.log('You finished typing:', setUserComment);
    }
     
    return (
        <div className="container">
            <h2> Ratings and Comments </h2>
            {
                posts.map((vari) => {
                        return(
                        <div>
                            <p>{vari.movieRating + " "}
                            <span>{vari.movieComments}</span>
                            </p>
                        </div>
                        )
                    }
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
                <textarea className="userComments" placeholder="Write Comments"  onBlur={handleBlur} value={userComment} onChange={(e)=>
            setUserComment(e.target.value)}/>
                <button className="submitBtn" onClick = {saveComments}>Submit</button>
            </div>
        </div>
    )
}

export default StarRating;