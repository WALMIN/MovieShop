import React,{useState} from 'react';
import { FaStar } from 'react-icons/fa';
import "./StarRating.css";

const colors = {
    orange : "#f8d568",
    grey : "#696969"
};

function StarRating() {
    
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
     
    return (
        <div className="container">
            <h2> Ratings and Comments </h2>
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
                <button className="submitBtn">Submit</button>
            </div>
        </div>
    )
}

export default StarRating;