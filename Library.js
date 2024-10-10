// src/Library.js
import React, { useState } from 'react';

const Library = () => {
    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddBook = () => {
        if (bookName) {
            setBooks([...books, bookName]);
            setBookName('');
        }
    };

    const handleEditBook = (index) => {
        setBookName(books[index]);
        setEditIndex(index);
    };

    const handleUpdateBook = () => {
        const updatedBooks = [...books];
        updatedBooks[editIndex] = bookName;
        setBooks(updatedBooks);
        setBookName('');
        setEditIndex(null);
    };

    const handleDeleteBook = (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Library Management</h2>
            <input
                type="text"
                className="form-control my-2"
                placeholder="Enter book name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
            />
            <button
                className="btn btn-primary my-2"
                onClick={editIndex !== null ? handleUpdateBook : handleAddBook}
            >
                {editIndex !== null ? 'Update Book' : 'Add Book'}
            </button>
            <input
                type="text"
                className="form-control my-2"
                placeholder="Search books"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className="list-group">
                {filteredBooks.map((book, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {book}
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditBook(index)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteBook(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Library;
