import React, { useState, useEffect } from "react";
import "./Book.css";

const Form = () => {
  const [addBooks, setAddBooks] = useState(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    return storedBooks || [];
  });

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    favorite: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(addBooks));
  }, [addBooks]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "title" || name === "author") {
      setError("");
    }
  };

  const handleClick = () => {
    if (newBook.title.trim() === "" || newBook.author.trim() === "") {
      setError("Title and Author cannot be empty!");
      return;
    }

    setAddBooks((prevBooks) => [...prevBooks, newBook]);
    setNewBook({
      title: "",
      author: "",
      favorite: false,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortAsc((prevSortAsc) => !prevSortAsc);
  };

  const handleDelete = (index) => {
    const updatedBooks = [...addBooks];
    updatedBooks.splice(index, 1);
    setAddBooks(updatedBooks);
  };

  const filteredBooks = addBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    const nameA = a.author.toUpperCase();
    const nameB = b.author.toUpperCase();

    if (sortAsc) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div>
      <div className="Container">
        <div className="Search">
          <i className="bx bx-search"></i>
          <input value={searchTerm} onChange={handleSearch} />
        </div>

        <div className="List-book">
          <h1> A list of Books</h1>
          <div className="List-item-book">
            <ul>
              {sortedBooks.map((book, index) => (
                <li key={index}>
                  <div className="List-book-content">
                    <div className="List-book-left">
                      {book.favorite && (
                        <span className="FavoriteStar">★ </span>
                      )}
                      <span className="Books">{book.title}</span>
                    </div>
                    <div className="List-book-right">
                      <span className="Authors">{book.author}</span>
                      <span
                        className="Delete"
                        onClick={() => handleDelete(index)}
                      >
                        <i class="bx bxs-trash-alt"></i>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleSort}>
            {sortAsc ? (
              <>
                Author Ascending <i class="bx bx-chevron-down"></i>
              </>
            ) : (
              <>
                Author Descending <i class="bx bx-chevron-up"></i>
              </>
            )}
          </button>
        </div>
        <div className="Add-book">
          <h1>Add a new Book</h1>
          <label className="Add-book-title">
            Title
            <input name="title" value={newBook.title} onChange={handleChange} />
          </label>
          <label className="Add-book-author">
            Author
            <input
              name="author"
              value={newBook.author}
              onChange={handleChange}
            />
          </label>
          <div className="Add-book-favorite">
            <label>
              <p>Favorite:</p>
              <input
                type="checkbox"
                name="favorite"
                checked={newBook.favorite}
                onChange={handleChange}
              />
            </label>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="button" onClick={handleClick}>
              <i className="bx bx-plus-circle"></i>Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
