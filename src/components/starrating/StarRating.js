import React,{ useState,useEffect, Component } from 'react';
import { FaStar } from 'react-icons/fa';
import "./StarRating.css";
import {db} from '../../firebase';

const colors = {
    orange : "#f8d568",
    grey : "#696969"
};

const ref = db.collection('movieinfo');

function StarRating(props) {
    const mId= props.movId;
   console.log("movieId in starrating:" + mId);
  //  const [mId,setMovieId] = useState("");
    const [posts,setPosts] = useState([]);
    const [userComment, setUserComment] = useState("");
    
    //setMovieId(props.movId);

    useEffect(() => {    
        console.log("Props Content" + mId);
        fetchFiebaseData();
    }, []);

    const fetchFiebaseData = () => 
    {
        console.log("Fetching Data"+mId);
        ref.where('movieId','==',mId).onSnapshot(snap => 
            {
            let commentsLists = [];
            snap.forEach(doc => {
                commentsLists.push({ ...doc.data() });
                //setPosts(postsLists);
            });
            setPosts(commentsLists);
            console.log("Got from firestore:" + commentsLists);
            //setPosts(snap.docs.map(doc=>doc.data()))
            //setPosts(commentsList);
           console.log("setPosts value:"+ setPosts.value);
        })
    }

     const stars = Array(5).fill(0);
     const selStars = Array(5).fill(0);

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
         //   alert('Added ratings & Comments successfully');
           console.log("Document successfully written!");
           setUserComment("");
           setCurrentValue(0);
           fetchFiebaseData();
           
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
            <h3><u> Ratings and Comments</u> </h3>
            <br/>
            {
                posts.map((vari) => {
                        return(
                        <div>
                            {/* <p>{vari.movieRating + " "} */}

                           <p> {selStars.map((_,index) => {
                                return(
                                <FaStar className="starSelected"
                                    key={index}
                                    color = {(vari.movieRating) > index ? colors.orange : colors.grey}
                                    />
                                )})}
                            <span>{" " + vari.movieComments}</span>
                            </p>
                            <hr className="lineBreak"/>
                        </div>
                        )
                    }
                )
            }
            <br/>
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