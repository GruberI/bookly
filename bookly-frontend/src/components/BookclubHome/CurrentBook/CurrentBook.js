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
    );
}

export default CurrentBook;