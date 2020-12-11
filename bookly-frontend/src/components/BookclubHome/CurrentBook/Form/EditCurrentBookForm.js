import React, { useState} from "react";
import '../CurrentBook.css';

import CurrentBookService from '../../../../services/currentBook-service';

const initialState = { title: "", author: "", image: "", description: "", isShowing: false};

const EditCurrentBookForm = (props) => {
    const [editCurrentBook, setEditCurrentBook] = useState(initialState)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditCurrentBook({ ...editCurrentBook, [name]: value });
      };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { title, author, image, description } = editCurrentBook
      const bookClubId = props.theBookclub._id
      const currentBookId = props.theCurrentBook._id

      const service = new CurrentBookService();

      service
        .updateCurrentBook({
            title,
            author,
            image,
            description,
            bookClubId,
            currentBookId
        })
        .then(() => {
            props.getBookClub()
        })
        .catch((error) => console.error(error));
    }

    const toggleForm = () =>
    !editCurrentBook.isShowing
      ? setEditCurrentBook({ ...editCurrentBook, isShowing: true })
      : setEditCurrentBook({ ...editCurrentBook, isShowing: false });

      return (
        <div>
        <button onClick={()=> toggleForm()} className="add-meeting-btn update-book">Update Book</button>
        <div>
        {editCurrentBook.isShowing && (
            <div>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={editCurrentBook.title}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={editCurrentBook.author}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        name="image"
                        value={editCurrentBook.image}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                        type="textarea"
                        name="description"
                        value={editCurrentBook.description}
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

export default EditCurrentBookForm;