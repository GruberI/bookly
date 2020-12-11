import React from "react";
import './CurrentBook.css';


const CurrentBook = (props) => {

    return (
      <div>
      
     { props && props.currentBook ? 
            <div className="current-book-details">
              <div className="book-details">
                  <img src={props.currentBook.image} alt="bookcover"/>
              </div>
              <div className="current-book-text">
                <div className="current-book-text-div">
                  <h4 className="title-h4">{props.currentBook.title} by {props.currentBook.author}</h4>
                  <p className="description-p">{props.currentBook.description}</p>
                </div>
              </div>
              </div>
              : ""} 
      
    </div>
        // <div className="current-book-div">
        // {props && props.currentBook ? props.currentBook.map((currentBookDetail) =>{
        //   return (
        //     <ul key={currentBookDetail._id} className="meeting-ul">
        //                 <li>Here: {currentBookDetail.image}</li>
        //                 <li>I: {currentBookDetail.title}</li>
        //                 <li>Am: {currentBookDetail.author}</li>
        //             </ul>
        //   )
        // }): ""}
  
        // </div>
    );
}

export default CurrentBook;