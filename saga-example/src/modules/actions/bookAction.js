export const loadBook = () => {
    return{
        type: "LOAD_BOOK"
    };
};

export const loadBookSuccess = books => {
    return{
        type: "LOAD_BOOK_SUCCESS",
        books: books
    };
};

export const loadBookFail = error => {
    return{
        type: "LOAD_BOOK_FAIL",
        error
    };
};