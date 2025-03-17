const { response } = require("express");

var books = [];

module.exports = {

    whoAmI: (request, response) => {
        response.status(200).json({ studentNumber: "2588206"});
    },

    getAllBooks: (request, response) => {
        if(!books){
            return response.status(200).json({
                message: "No Books :(",
                books: books
            });
        }
        return response.status(200).json(books);
    },

    getSpecificBook: (request, response) => {

        const {id} = request.params;

        const book = books.find(b => b.id === id);

        if(!book){
            response.status(404).json({error: "Book Does Not Exist"});
        }

        response.status(200).json(book);
    },

    addBook: (request, response) => {

        const {id, title, details} = request.body;
        const detailsArr = details;

        if(!title){
            response.status(400).json({error: "Book Must Have a Title"});
        }

        if(!details){
            response.status(400).json({error: "Book must have details"});
        }

        for (let d of detailsArr) {
            const {id: idDet, author, genre, publicationYear} = d;

            if(!idDet){
                response.status(400).json({error: `Detail ${d} Must Have a valid id`});
            }
    
            if(!author){
                response.status(400).json({error: "Book must have an author"});
            }

            if(!genre){
                response.status(400).json({error: "Book must have a genre"});
            }

            if(!publicationYear || isNaN(publicationYear)){
                response.status(400).json({error: "Book must have a valid numerical publication Year"});
            }

        }

        var newBook = {
            id: id,
            title: title,
            details: detailsArr
        }

        books.push(newBook);

        response.status(200).json({message: "Book Added!"});
    },

    updateBook: (request, response) => {

        const {id} = request.params;

        const {id: idBook, title, details} = request.body;

        const book = books.findIndex(b => b.id === id);

        if(book === -1){
            response.status(404).json({error: "Book was not found"});
        }

        if(!title){
            response.status(400).json({error: "Book Must Have a Title"});
        }

        if(!details){
            response.status(400).json({error: "Book must have details"});
        }

        for (let d of details) {
            var {id: idDetails, author, genre, publicationYear} = d;

            if(!idDetails){
                response.status(400).json({error: "Book Must Have a valid id"});
            }
    
            if(!author){
                response.status(400).json({error: "Book must have an author"});
            }

            if(!genre){
                response.status(400).json({error: "Book must have a genre"});
            }

            if(!publicationYear || isNaN(publicationYear)){
                response.status(400).json({error: "Book must have a valid numerical publication Year"});
            }

        }

        books[book] = {
            id: idBook,
            title: title,
            details: details
        }

        response.status(200).json({message: "Book Updated!"});

    },

    deleteBook: (request, response) => {
        const id = request.params;
        const book = books.findIndex(b => b.id === id.id);

        if(book === -1){
            response.status(404).json({error: "Book not found"});
        }

        books.splice(book, 1);

        response.status(200).json({message: "Book Deleted!"});
    },

    addDetail: (request, response) =>{
        const {id} = request.params;
        const newDetail = request.body;
        
        const book = books.find(b => b.id === id);

        if(!book){
            response.status(404).json({error:"Book Not Found"});
        }
        if(!newDetail){
            response.status(404).json({error: "Must include detail to add"});
        }

        book.details.push(newDetail);
        response.status(200).json({message: "Detail Added", book: book});
    },

    deleteDetail: (request, response) => {

        const {id, detailId} = request.params;
        const book = books.find(b => b.id === id);

        if(!book){
            response.status(404).json({error:"Book Not Found"});
        }
        
        const detail = book.details.findIndex(d => d.id === detailId);

        if(detail === -1){
            response.status(404).json({error: "Detail Not Found"});
        }

        book.details.splice(detail, 1);

        response.status(200).json({message: "Detail deleted!"});

    }

}
