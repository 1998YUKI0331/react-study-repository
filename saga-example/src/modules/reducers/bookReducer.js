const books = (state = [], action) => {
    switch(action.type){
        case "LOAD_BOOK_SUCCESS":
            return [...state, ...action.books];
        case "LOAD_BOOK_FAIL":
            return [...state, action.error];
        default:
            return state;
    }
};

export default books;