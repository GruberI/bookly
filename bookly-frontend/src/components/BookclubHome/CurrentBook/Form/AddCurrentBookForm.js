import React, { useState} from "react";
// import axios from 'axios';

import CurrentBookService from '../../../../services/currentBook-service';

const initialState = { title: "", author: "", image: "", description: "", isShowing: false};

const AddCurrentBookForm = (props) => {
    const [addCurrentBook, setAddCurrentBook] = useState(initialState)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddCurrentBook({ ...addCurrentBook, [name]: value });
      };

const handleFormSubmit = (event) => {
        event.preventDefault();
  
        const { title, author, image, description} = addCurrentBook;
        const bookClubId = props.theBookclub._id
  
        const service = new CurrentBookService();
  
        service
          .createCurrentBook({
              title,
              author,
              image,
              description,
              bookClubId
          })
          .then(() => {
              props.getBookClub()
              setAddCurrentBook(initialState)
          })
          .catch((error) => console.error(error));
    }

    const toggleForm = () =>
    !addCurrentBook.isShowing
      ? setAddCurrentBook({ ...addCurrentBook, isShowing: true })
      : setAddCurrentBook({ ...addCurrentBook, isShowing: false });

    return (
        <div>
            <button onClick={()=> toggleForm()} className="add-meeting-btn">Add Book</button>
            <div>
            {addCurrentBook.isShowing && (
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={addCurrentBook.title}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={addCurrentBook.author}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="image">Image:</label>
                        <input
                            type="text"
                            name="image"
                            value={addCurrentBook.image}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <input
                            type="textarea"
                            name="description"
                            value={addCurrentBook.description}
                            onChange={handleInputChange}
                        />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )}
            </div>
        </div>
    )
}

export default AddCurrentBookForm;